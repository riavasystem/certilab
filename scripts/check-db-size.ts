import { config } from 'dotenv';
config();

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';

const db = drizzle(neon(process.env.DATABASE_URL!));

async function checkSize() {
  try {
    const result = await db.execute(sql`
      SELECT pg_size_pretty(pg_database_size(current_database()));
    `);
    console.log('Result:', result);
  } catch (error) {
    console.error('Error checking DB size:', error);
  }
}

checkSize();
