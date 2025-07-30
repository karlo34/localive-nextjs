import pool from '@/lib/db.js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get the user ID from cookies
    const cookieStore = cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'User is not logged in' }, { status: 400 });
    }

    // Query the database for all job applications for the current user
    const [applications] = await pool.query(
      'SELECT job_id FROM job_applications WHERE user_id = ?',
      [userId]
    );

    // If the user has no applications, return an empty array
    const jobIds = applications.map((application) => application.job_id);

    return NextResponse.json({
      applications: jobIds, // Return an array of job IDs the user has applied for
    });
  } catch (error) {
    console.error('Error fetching user applications:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
