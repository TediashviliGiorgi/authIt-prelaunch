import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Supabase/Neon-ისთვის ხშირად საჭიროა
  }
});

export const query = (text: string, params?: any[]) => pool.query(text, params);