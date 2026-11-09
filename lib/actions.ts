"use server";

import { db } from "@/lib/db";
import { domains, questions, examAttempts, questionAttempts, lessons } from "@/lib/db/schema";
import { eq, sql, count } from "drizzle-orm";
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
  // Total preguntas respondidas (ejemplo simplificado)
  const totalAttempts = await db.select({ count: count() }).from(questionAttempts);

  // Total preguntas en BD
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
  return await db.select().from(examAttempts).orderBy(sql`${examAttempts.startTime} DESC`);
}
