import "dotenv/config";
import { db } from "./lib/db";
import { domains } from "./lib/db/schema";

async function listDomains() {
  try {
    const allDomains = await db.select().from(domains);
    console.log("Domains in database:");
    allDomains.forEach(d => console.log(`- ${d.name} (ID: ${d.id})`));
  } catch (error) {
    console.error("Error fetching domains:", error);
  }
}

listDomains().catch(console.error);
