import { createConnection } from '@/lib/db.js';
import { cookies } from 'next/headers'; // <-- use this in Next.js app routes
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { review } = body;

    // Read cookies from request
    const cookieStore = cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId || !review) {
      return NextResponse.json(
        { error: 'Missing userId or review content' },
        { status: 400 }
      );
    }

    const db = await createConnection();
    const sql = 'INSERT INTO reviews (user_id, content) VALUES (?, ?)';
    const [result] = await db.query(sql, [userId, review]);

    return NextResponse.json({
      message: 'Review added successfully',
      insertedId: result.insertId,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
