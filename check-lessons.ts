import "dotenv/config";
import { db } from "./lib/db";
import { lessons } from "./lib/db/schema";

async function checkLessons() {
  try {
    const allLessons = await db.select().from(lessons);
    console.log("Lessons in database:", allLessons.length);
    allLessons.forEach(l => console.log(`- [Domain ID: ${l.domainId}] ${l.title}`));
  } catch (error) {
    console.error("Error fetching lessons:", error);
  }
}

checkLessons().catch(console.error);
