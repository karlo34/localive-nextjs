import pool from '@/lib/db.js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { review } = body;

    const cookieStore = cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId || !review) {
      return NextResponse.json(
        { error: 'Missing userId or review content' },
        { status: 400 }
      );
    }

    // Use pool.query() directly; no manual connection handling needed
    const [existing] = await pool.query(
      'SELECT id FROM reviews WHERE user_id = ? LIMIT 1',
      [userId]
    );

    let result;

    if (existing.length > 0) {
      const reviewId = existing[0].id;
      [result] = await pool.query(
        'UPDATE reviews SET content = ?, changed_at = NOW() WHERE id = ?',
        [review, reviewId]
      );
      return NextResponse.json({
        message: 'Review updated successfully',
        updatedId: reviewId,
      });
    } else {
      [result] = await pool.query(
        'INSERT INTO reviews (user_id, content, created_at, changed_at) VALUES (?, ?, NOW(), NOW())',
        [userId, review]
      );
      return NextResponse.json({
        message: 'Review added successfully',
        insertedId: result.insertId,
      });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
