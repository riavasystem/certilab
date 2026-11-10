"use server";

import { db } from "@/lib/db";
import { domains, questions, examAttempts, examAttemptQuestions, questionAttempts, lessons, learningProgress } from "@/lib/db/schema";
import { eq, count, and, inArray, asc, sql as drizzleSql } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

export async function createExamAttempt(mode: string) {
  noStore();
  const [attempt] = await db.insert(examAttempts).values({
    mode,
    status: 'in-progress',
  }).returning();

  redirect(`/examen/${attempt.id}`);
}

export async function getDashboardStats() {
  noStore();
  const totalAttempts = await db.select({ count: count() }).from(questionAttempts);
  const totalQuestions = await db.select({ count: count() }).from(questions);

  return {
    totalQuestions: totalQuestions[0].count,
    answeredQuestions: totalAttempts[0].count,
  };
}

export async function getDomains() {
  noStore();
  return await db.select().from(domains);
}

export async function getDomainById(id: number) {
  noStore();
  const res = await db.select().from(domains).where(eq(domains.id, id));
  return res[0];
}

export async function getLessonsByDomain(domainId: number) {
  noStore();
  return await db.select().from(lessons).where(eq(lessons.domainId, domainId));
}

export async function getExamAttempt(id: number) {
  noStore();
  const res = await db.select().from(examAttempts).where(eq(examAttempts.id, id));
  return res[0];
}

export async function getExamAttempts() {
  noStore();
  return await db.select().from(examAttempts).orderBy(drizzleSql`${examAttempts.startTime} DESC`);
}

export async function updateLessonProgress(lessonId: number, status: string) {
  noStore();

  const existingProgress = await db.select()
    .from(learningProgress)
    .where(eq(learningProgress.lessonId, lessonId));

  if (existingProgress.length > 0) {
    await db.update(learningProgress)
      .set({ status, updatedAt: new Date() })
      .where(eq(learningProgress.lessonId, lessonId));
  } else {
    await db.insert(learningProgress)
      .values({ lessonId, status, updatedAt: new Date() });
  }
}

export async function getLessonProgress(lessonId: number) {
  noStore();
  const res = await db.select().from(learningProgress).where(eq(learningProgress.lessonId, lessonId));
  return res[0] || null;
}

export async function getQuestionsForExam(attemptId: number) {
  noStore();
  const attempt = await getExamAttempt(attemptId);
  if (!attempt) return [];

  // Si el intento ya tiene preguntas asignadas, devolverlas en el mismo orden
  const assigned = await db.select()
    .from(examAttemptQuestions)
    .where(eq(examAttemptQuestions.attemptId, attemptId))
    .orderBy(asc(examAttemptQuestions.order));

  if (assigned.length > 0) {
    const ids = assigned.map(a => a.questionId);
    const qs = await db.select().from(questions).where(inArray(questions.id, ids));
    return ids.map(id => qs.find(q => q.id === id)).filter((q): q is NonNullable<typeof q> => !!q);
  }

  // Primera vez: seleccionar y persistir el orden para poder reanudar
  let selectedQuestions: (typeof questions.$inferSelect)[] = [];

  if (attempt.mode === 'simulacro') {
    const weights = [
      { id: 1, count: 13 },
      { id: 2, count: 16 },
      { id: 3, count: 18 },
      { id: 4, count: 9 },
      { id: 5, count: 9 },
    ];

    for (const w of weights) {
      const q = await db.select()
        .from(questions)
        .where(eq(questions.domainId, w.id))
        .orderBy(drizzleSql`RANDOM()`)
        .limit(w.count);
      selectedQuestions = [...selectedQuestions, ...q];
    }
  } else {
    selectedQuestions = await db.select().from(questions).orderBy(drizzleSql`RANDOM()`).limit(10);
  }

  if (selectedQuestions.length > 0) {
    await db.insert(examAttemptQuestions).values(
      selectedQuestions.map((q, index) => ({
        attemptId,
        questionId: q.id,
        order: index,
      }))
    );
  }

  return selectedQuestions;
}

export async function getSavedAnswers(attemptId: number) {
  noStore();
  const attempts = await db.select().from(questionAttempts)
    .where(eq(questionAttempts.attemptId, attemptId));
  return attempts.map(a => ({ questionId: a.questionId, userAnswer: a.userAnswer }));
}

export async function submitAnswer(attemptId: number, questionId: number, answer: any) {
  noStore();

  const q = (await db.select().from(questions).where(eq(questions.id, questionId)))[0];
  const isCorrect = JSON.stringify(answer) === JSON.stringify(q.correctAnswer);

  // Check if answer already exists for this question in this attempt
  const existing = await db.select().from(questionAttempts)
    .where(and(eq(questionAttempts.attemptId, attemptId), eq(questionAttempts.questionId, questionId)));

  if (existing.length > 0) {
    await db.update(questionAttempts)
      .set({ userAnswer: answer, isCorrect, timestamp: new Date() })
      .where(eq(questionAttempts.id, existing[0].id));
  } else {
    await db.insert(questionAttempts).values({
      attemptId,
      questionId,
      userAnswer: answer,
      isCorrect,
    });
  }

  return { isCorrect };
}

export async function finishExam(attemptId: number) {
  noStore();

  const attempts = await db.select().from(questionAttempts).where(eq(questionAttempts.attemptId, attemptId));
  const correct = attempts.filter(a => a.isCorrect).length;
  const score = Math.round((correct / attempts.length) * 100);

  await db.update(examAttempts)
    .set({ status: 'completed', score, endTime: new Date() })
    .where(eq(examAttempts.id, attemptId));

  redirect(`/examen/${attemptId}/resultado`);
}

export async function getExamResults(attemptId: number) {
  noStore();
  const attempt = await getExamAttempt(attemptId);
  const attempts = await db.select().from(questionAttempts)
    .where(eq(questionAttempts.attemptId, attemptId));

  const questionIds = attempts.map(a => a.questionId).filter((id): id is number => id !== null);
  const qs = await db.select().from(questions).where(inArray(questions.id, questionIds));

  const detailedResults = attempts.map(a => {
    const q = qs.find(q => q.id === a.questionId);
    return { ...q, userAnswer: a.userAnswer, isCorrect: a.isCorrect };
  });

  return { attempt, detailedResults };
}
