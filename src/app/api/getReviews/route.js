import pool from '@/lib/db.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sql = `
      SELECT 
        reviews.id AS review_id,
        reviews.content,
        reviews.created_at,
        users.id AS user_id,
        users.name,
        users.email
      FROM reviews
      JOIN users ON reviews.user_id = users.id
    `;
    
    // Use pool.query directly — no need to manually open/close connections
    const [rows] = await pool.query(sql);

    return NextResponse.json({ reviews: rows });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
