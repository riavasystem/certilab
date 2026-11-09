import "dotenv/config";
import { db } from "../lib/db";
import { domains, lessons } from "../lib/db/schema";
import { eq } from "drizzle-orm";

async function seedLessons() {
  console.log("🌱 Starting lessons seed...");

  const domain = await db.select().from(domains).where(eq(domains.name, "Fundamentals of AI and ML")).limit(1);

  if (domain.length === 0) {
    console.error("❌ Domain not found.");
    return;
  }

  const domainId = domain[0].id;

  const lessonsData = [
    {
      domainId,
      title: "Introduction to AI and ML",
      content: "# Introduction\n\nAI is a broad field. ML is a subset focused on learning from data...",
      order: 1
    },
    {
      domainId,
      title: "Supervised Learning",
      content: "# Supervised Learning\n\nModel learns from labeled data...",
      order: 2
    }
  ];

  for (const l of lessonsData) {
    await db.insert(lessons).values(l);
    console.log(`✅ Lesson inserted: ${l.title}`);
  }

  console.log("🚀 Lessons seeding completed!");
}

seedLessons().catch((err) => {
  console.error("❌ Lessons seed failed:", err);
  process.exit(1);
});
