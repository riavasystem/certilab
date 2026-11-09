import { pgTable, serial, text, integer, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";

export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});

export const domains = pgTable("domains", {
  id: serial("id").primaryKey(),
  certificationId: integer("certification_id").references(() => certifications.id),
  name: text("name").notNull(),
  weight: integer("weight").notNull(), // Percent 0-100
  description: text("description"),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  domainId: integer("domain_id").references(() => domains.id),
  title: text("title").notNull(),
  content: text("content").notNull(), // Markdown or JSON
  order: integer("order").notNull(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  domainId: integer("domain_id").references(() => domains.id),
  type: text("type").notNull(), // 'single', 'multiple', 'ordering', 'matching'
  questionText: text("question_text").notNull(),
  options: jsonb("options").notNull(), // Array or Object of options
  correctAnswer: jsonb("correct_answer").notNull(), // Depends on type
  explanation: text("explanation"),
  distractorExplanations: jsonb("distractor_explanations"), // Explanations for wrong options
  difficulty: text("difficulty"), // 'basic', 'intermediate', 'advanced'
  reference: text("reference"),
});

export const examAttempts = pgTable("exam_attempts", {
  id: serial("id").primaryKey(),
  certificationId: integer("certification_id").references(() => certifications.id),
  mode: text("mode").notNull(), // 'learning', 'evaluation', 'simulacro'
  status: text("status").notNull(), // 'in-progress', 'completed'
  score: integer("score"),
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time"),
});

export const questionAttempts = pgTable("question_attempts", {
  id: serial("id").primaryKey(),
  attemptId: integer("attempt_id").references(() => examAttempts.id),
  questionId: integer("question_id").references(() => questions.id),
  userAnswer: jsonb("user_answer"),
  isCorrect: boolean("is_correct"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const learningProgress = pgTable("learning_progress", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id),
  status: text("status").notNull(), // 'pending', 'in-progress', 'completed'
  updatedAt: timestamp("updated_at").defaultNow(),
});
