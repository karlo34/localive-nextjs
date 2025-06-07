import pool from '@/lib/db.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sql = "SELECT * FROM users";
    const [customers] = await pool.query(sql);
    return NextResponse.json(customers);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
