import { createConnection } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await createConnection();
    const [rows] = await db.query("SELECT COUNT(id) AS userCount FROM users");

    const count = rows[0]?.userCount ?? 0;

    return NextResponse.json({ number: count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
