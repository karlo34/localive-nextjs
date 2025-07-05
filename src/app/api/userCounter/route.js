import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sql = `
      SELECT
        (SELECT COUNT(id) FROM users) AS userCount,
        (SELECT COUNT(id) FROM events) AS eventCount,
        (SELECT COUNT(id) FROM partners) AS partnerCount
    `;
    const [rows] = await pool.query(sql);
    const { userCount = 0, eventCount = 0, partnerCount= 0 } = rows[0]

    return NextResponse.json({ users: userCount, events: eventCount, partners: partnerCount});
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}