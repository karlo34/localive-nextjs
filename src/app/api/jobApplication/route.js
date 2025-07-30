import pool from '@/lib/db.js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { jobId } = body;  // Assuming jobId is passed from the job card (the client)

    const cookieStore = cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId || !jobId) {
      return NextResponse.json(
        { error: 'Missing userId or jobId' },
        { status: 400 }
      );
    }

    // Check if the user has already applied for this job
    const [existingApplication] = await pool.query(
      'SELECT id FROM job_applications WHERE job_id = ? AND user_id = ? LIMIT 1',
      [jobId, userId]
    );

    // If the user has already applied, return an error message
    if (existingApplication.length > 0) {
      return NextResponse.json(
        { error: 'You have already applied for this job' },
        { status: 400 }
      );
    }

    // Insert a new record in the job_applications table
    const [result] = await pool.query(
      'INSERT INTO job_applications (job_id, user_id, applied_at, status) VALUES (?, ?, NOW(), ?)',
      [jobId, userId, 'applied'] // status 'applied' by default
    );

    return NextResponse.json({
      message: 'Job application submitted successfully',
      insertedId: result.insertId,
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
