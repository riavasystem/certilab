"use server";

import { db } from "@/lib/db";
import { domains, questions, examAttempts, questionAttempts } from "@/lib/db/schema";
import { eq, sql, count } from "drizzle-orm";

export async function getDashboardStats() {
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
  return await db.select().from(domains);
}

export async function getExamAttempts() {
  return await db.select().from(examAttempts).orderBy(sql`${examAttempts.startTime} DESC`);
}

