import "dotenv/config";
import { db } from "../lib/db";
import { domains, questions } from "../lib/db/schema";
import { eq } from "drizzle-orm";

async function populateQuestionsToThirteen() {
  console.log("🌱 Starting to populate questions to 13 per domain...");

  const domainsList = await db.select().from(domains);

  for (const domain of domainsList) {
    console.log(`\nProcessing domain: ${domain.name}`);

    // Check existing count
    const existingQuestions = await db.select().from(questions).where(eq(questions.domainId, domain.id));
    const currentCount = existingQuestions.length;
    const needed = 13 - currentCount;

    console.log(`Current: ${currentCount}, Needed: ${needed}`);

    if (needed <= 0) {
      console.log(`✅ ${domain.name} is already sufficiently populated.`);
      continue;
    }

    const questionsToAdd: any[] = [];
    for (let i = 0; i < needed; i++) {
      questionsToAdd.push({
        domainId: domain.id,
        type: "single" as const,
        questionText: `Placeholder question ${i + 1} for ${domain.name} to reach 13.`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A",
        explanation: "This is a placeholder explanation.",
        distractorExplanations: {
          "Option B": "Incorrect",
          "Option C": "Incorrect",
          "Option D": "Incorrect"
        },
        difficulty: "basic" as const
      });
    }

    for (const q of questionsToAdd) {
      await db.insert(questions).values(q);
      console.log(`✅ Question added to ${domain.name}: ${q.questionText.substring(0, 30)}...`);
    }
  }

  console.log("🚀 Question population completed!");
}

populateQuestionsToThirteen().catch(console.error);
