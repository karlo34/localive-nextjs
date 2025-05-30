import { createConnection } from '@/lib/db.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await createConnection();
    const sql = "SELECT * FROM users";
    const [users] = await db.query(sql);
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
