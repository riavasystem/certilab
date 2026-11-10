import { config } from 'dotenv';
config();

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';
import * as schema from '../lib/db/schema';

const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

async function checkDbStats() {
  try {
    // 1. Database Size
    const sizeResult = await db.execute(sql`
      SELECT pg_size_pretty(pg_database_size(current_database()));
    `);
    console.log('Raw sizeResult:', sizeResult); // Debug

    // 2. Count Questions
    const questionsResult = await db.execute(sql`
      SELECT COUNT(*) as count FROM questions;
    `);

    // 3. Count Questions per Domain
    const domainCounts = await db.execute(sql`
      SELECT d.name, COUNT(q.id) as count
      FROM domains d
      LEFT JOIN questions q ON d.id = q.domain_id
      GROUP BY d.name;
    `);

    console.log('--- Database Stats ---');
    console.log('DB size:', (sizeResult as any).rows[0].pg_size_pretty);
    console.log('Total questions:', (questionsResult as any).rows[0].count);
    console.log('\nQuestions per domain:');
    (domainCounts as any).rows.forEach((row: any) => {
      console.log(`  ${row.name}: ${row.count}`);
    });

    // 4. Alert if > 800MB (approx 80% of 1GB limit)
    const sizeInKb = parseInt((sizeResult as any).rows[0].pg_size_pretty);
    if (sizeInKb > 800 * 1024) { // Assuming result is in kB
      console.warn('\n⚠️ WARNING: Database size is approaching the 1GB limit!');
    }

  } catch (error) {
    console.error('Error fetching stats:', error);
  }
}

checkDbStats();
