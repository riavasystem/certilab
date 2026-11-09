import "dotenv/config";
import { db } from "../lib/db";
import { certifications, domains } from "../lib/db/schema";

async function seed() {
  console.log("🌱 Starting seed...");

  // 1. Insert Certification
  const [cert] = await db.insert(certifications).values({
    name: "AWS Certified AI Practitioner (AIF-C01)",
    description: "Foundational understanding of AI concepts and AWS AI tools.",
  }).returning();

  console.log(`✅ Certification inserted: ${cert.name}`);

  // 2. Insert Domains
  const domainData = [
    { name: "Fundamentals of AI and ML", weight: 20 },
    { name: "Fundamentals of GenAI", weight: 24 },
    { name: "Applications of Foundation Models", weight: 28 },
    { name: "Guidelines for Responsible AI", weight: 14 },
    { name: "Security, Compliance, and Governance for AI Solutions", weight: 14 },
  ];

  for (const domain of domainData) {
    await db.insert(domains).values({
      certificationId: cert.id,
      name: domain.name,
      weight: domain.weight,
    });
    console.log(`✅ Domain inserted: ${domain.name}`);
  }

  console.log("🚀 Seeding completed!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
