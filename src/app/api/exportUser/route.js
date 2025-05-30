import { createConnection } from '@/lib/db.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { Username, Email } = body;

    if (!Username || !Email) {
      return NextResponse.json({ error: 'Username and Email are required' }, { status: 400 });
    }

    const db = await createConnection();
    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    const [result] = await db.query(sql, [Username, Email]);

    return NextResponse.json({
      message: 'User added successfully',
      userId: result.insertId
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}