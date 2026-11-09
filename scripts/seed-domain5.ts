import "dotenv/config";
import { db } from "../lib/db";
import { domains, lessons, questions } from "../lib/db/schema";
import { eq } from "drizzle-orm";

async function seedDomain5() {
  console.log("🌱 Starting Domain 5 seed...");

  const domain = await db.select().from(domains).where(eq(domains.name, "Security, Compliance, and Governance for AI Solutions")).limit(1);

  if (domain.length === 0) {
    console.error("❌ Domain not found.");
    return;
  }

  const domainId = domain[0].id;

  // Insert Lessons
  const lessonsData = [
    { domainId, title: "Securing AI Systems", content: "Implement IAM roles, encryption, and threat detection. Manage prompt injection risks.", order: 1 },
    { domainId, title: "Data Governance and Compliance", content: "Utilize AWS Config, CloudTrail, and Artifact for compliance. Manage data lifecycles.", order: 2 },
    { domainId, title: "Hallucination and Output Validation", content: "Use RAG grounding and output validation techniques to improve accuracy.", order: 3 }
  ];

  for (const l of lessonsData) await db.insert(lessons).values(l);
  console.log("✅ Lessons inserted");

  // Insert Questions
  const questionsData = [
    {
        domainId, type: "single",
        questionText: "Which AWS service is best suited to provide audit trails and logging requirements for AI interactions?",
        options: ["AWS CloudTrail", "AWS Config", "Amazon Inspector", "Amazon Macie"],
        correctAnswer: "AWS CloudTrail",
        explanation: "CloudTrail logs user activity and API usage, essential for audit trails.",
        distractorExplanations: { "AWS Config": "Monitors resource configurations.", "Amazon Inspector": "Automated security assessments.", "Amazon Macie": "Data privacy and security service." },
        difficulty: "basic"
    }
  ];

  for (const q of questionsData) await db.insert(questions).values(q);
  console.log("✅ Questions inserted");
}

seedDomain5().catch(console.error);
