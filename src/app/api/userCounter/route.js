import pool from '@/lib/db';  // default import
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT COUNT(id) AS userCount FROM users");
    const count = rows[0]?.userCount ?? 0;
    return NextResponse.json({ number: count });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}