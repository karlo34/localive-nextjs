import pool from '@/lib/db.js';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const body = await request.json();
    const { Username, Email, Password } = body;

    if (!Username || !Email || !Password) {
      return NextResponse.json(
        { error: 'Username, Email and Password are required' },
        { status: 400 }
      );
    }

    // Hash the password with bcrypt
    const saltRounds = 10; // you can adjust cost factor
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const sql = "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";
    const [result] = await pool.query(sql, [Username, Email, hashedPassword]);

    return NextResponse.json({
      message: 'User added successfully',
      userId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
