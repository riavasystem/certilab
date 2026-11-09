import "dotenv/config";
import { db } from "../lib/db";
import { domains, lessons, questions } from "../lib/db/schema";
import { eq } from "drizzle-orm";

async function seedDomain4() {
  console.log("🌱 Starting Domain 4 seed...");

  const domain = await db.select().from(domains).where(eq(domains.name, "Guidelines for Responsible AI")).limit(1);

  if (domain.length === 0) {
    console.error("❌ Domain not found.");
    return;
  }

  const domainId = domain[0].id;

  // Insert Lessons
  const lessonsData = [
    { domainId, title: "Responsible AI Principles", content: "Focus on fairness, bias detection, inclusivity, and robustness in AI systems.", order: 1 },
    { domainId, title: "AWS Tools for Responsible AI", content: "Using Amazon Bedrock Guardrails to enforce safety policies and filter outputs.", order: 2 },
    { domainId, title: "Transparency and Explainability", content: "Using SageMaker Model Cards to document model behavior and ensure transparency.", order: 3 }
  ];

  for (const l of lessonsData) await db.insert(lessons).values(l);
  console.log("✅ Lessons inserted");

  // Insert Questions
  const questionsData = [
    {
        domainId, type: "single",
        questionText: "Which AWS tool can be used to enforce safety policies and filter harmful outputs in generative AI applications?",
        options: ["Amazon Bedrock Guardrails", "AWS Config", "Amazon Inspector", "AWS Artifact"],
        correctAnswer: "Amazon Bedrock Guardrails",
        explanation: "Bedrock Guardrails allows users to implement safety policies and filter unwanted content.",
        distractorExplanations: { "AWS Config": "For resource tracking.", "Amazon Inspector": "For vulnerability scanning.", "AWS Artifact": "For compliance documents." },
        difficulty: "basic"
    }
  ];

  for (const q of questionsData) await db.insert(questions).values(q);
  console.log("✅ Questions inserted");
}

seedDomain4().catch(console.error);
