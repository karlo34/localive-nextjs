import pool from '@/lib/db';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobId } = body as { jobId?: number };

    const cookieStore = await cookies(); // ✅ await is needed
    const userId = cookieStore.get('userId')?.value;

    if (!userId || !jobId) {
      return NextResponse.json(
        { error: 'Missing userId or jobId' },
        { status: 400 }
      );
    }

    const [existingApplication] = await pool.query(
      'SELECT id FROM job_applications WHERE job_id = ? AND user_id = ? LIMIT 1',
      [jobId, userId]
    ) as any[];

    if (existingApplication.length > 0) {
      return NextResponse.json(
        { error: 'You have already applied for this job' },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      'INSERT INTO job_applications (job_id, user_id, applied_at, status) VALUES (?, ?, NOW(), ?)',
      [jobId, userId, 'applied']
    ) as any[];

    return NextResponse.json({
      message: 'Job application submitted successfully',
      insertedId: result.insertId,
    });

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  console.log("Delete route hit");

  try {
    const body = await request.json();
    const { jobId } = body as { jobId?: number };

    const cookieStore = await cookies(); // ✅ await is needed
    const userId = cookieStore.get("userId")?.value;

    console.log("jobId:", jobId);
    console.log("userId:", userId);
    console.log("All cookies:", cookieStore.getAll());

    if (!userId || !jobId) {
      return NextResponse.json(
        { error: "Missing userId or jobId" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      "DELETE FROM job_applications WHERE job_id = ? AND user_id = ?",
      [jobId, userId]
    ) as any[];

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "You have not applied for this job or application does not exist" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Job application removed successfully",
    });

  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
