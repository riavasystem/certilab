import "dotenv/config";
import { db } from "../lib/db";
import { domains, lessons, questions } from "../lib/db/schema";
import { eq } from "drizzle-orm";

async function seedDomain3() {
  console.log("🌱 Starting Domain 3 seed...");

  const domain = await db.select().from(domains).where(eq(domains.name, "Applications of Foundation Models")).limit(1);

  if (domain.length === 0) {
    console.error("❌ Domain not found.");
    return;
  }

  const domainId = domain[0].id;

  // Insert Lessons
  const lessonsData = [
    { domainId, title: "FM Design Considerations", content: "Selecting models based on cost, latency, modality. RAG basics.", order: 1 },
    { domainId, title: "Prompt Engineering", content: "Techniques: Zero-shot, Few-shot, Chain-of-thought.", order: 2 },
    { domainId, title: "FM Training & Evaluation", content: "Pre-training, Fine-tuning, RLHF. Evaluation metrics (ROUGE, BLEU).", order: 3 }
  ];

  for (const l of lessonsData) await db.insert(lessons).values(l);
  console.log("✅ Lessons inserted");

  // Insert Questions
  const questionsData = [
    {
        domainId, type: "single",
        questionText: "Which technique involves providing a few examples of input-output pairs to guide the FM response?",
        options: ["Zero-shot", "Few-shot", "Chain-of-thought", "Fine-tuning"],
        correctAnswer: "Few-shot",
        explanation: "Few-shot prompting provides examples to guide the model.",
        distractorExplanations: { "Zero-shot": "No examples.", "Chain-of-thought": "Encourages reasoning steps.", "Fine-tuning": "Modifying model weights." },
        difficulty: "basic"
    }
  ];

  for (const q of questionsData) await db.insert(questions).values(q);
  console.log("✅ Questions inserted");
}

seedDomain3().catch(console.error);
