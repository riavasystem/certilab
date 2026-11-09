import "dotenv/config";
import { db } from "../lib/db";
import { domains, lessons, questions } from "../lib/db/schema";
import { eq } from "drizzle-orm";

async function seedDomain2() {
  console.log("🌱 Starting Domain 2 seed...");

  const domain = await db.select().from(domains).where(eq(domains.name, "Fundamentals of GenAI")).limit(1);

  if (domain.length === 0) {
    console.error("❌ Domain not found.");
    return;
  }

  const domainId = domain[0].id;

  // Insert Lessons
  const lessonsData = [
    { domainId, title: "Foundational GenAI Concepts", content: "Tokens, chunking, embeddings, vectors...", order: 1 },
    { domainId, title: "Capabilities and Limitations", content: "Advantages: adaptability, responsiveness. Disadvantages: hallucinations.", order: 2 },
    { domainId, title: "AWS Infrastructure for GenAI", content: "Amazon Bedrock, SageMaker JumpStart.", order: 3 }
  ];

  for (const l of lessonsData) await db.insert(lessons).values(l);
  console.log("✅ Lessons inserted");

  // Insert Questions
  const questionsData = [
    {
        domainId, type: "single",
        questionText: "Which of the following is a potential disadvantage of GenAI solutions?",
        options: ["Adaptability", "Conversational capabilities", "Hallucinations", "Content generation"],
        correctAnswer: "Hallucinations",
        explanation: "Hallucinations are a known limitation of GenAI models.",
        distractorExplanations: { "Adaptability": "Advantage", "Conversational capabilities": "Advantage", "Content generation": "Advantage" },
        difficulty: "basic"
    }
  ];

  for (const q of questionsData) await db.insert(questions).values(q);
  console.log("✅ Questions inserted");
}

seedDomain2().catch(console.error);
