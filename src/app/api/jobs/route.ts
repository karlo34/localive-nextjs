import pool from '@/lib/db.js';
import { NextResponse } from 'next/server';

// /api/jobs
export async function GET() {
  try {
    const sql = `
      SELECT 
        jobs.id AS job_id, 
        jobs.company_name, 
        jobs.created_at, 
        jobs.description, 
        jobs.expires_at, 
        jobs.is_active, 
        jobs.location_id, 
        jobs.posted_by, 
        jobs.title, 
        locations.city, 
        locations.country, 
        locations.region,
        COUNT(job_applications.id) AS application_count
      FROM jobs
      JOIN locations ON jobs.location_id = locations.id
      LEFT JOIN job_applications ON jobs.id = job_applications.job_id
      GROUP BY jobs.id;
    `;

    const [jobs] = await pool.query(sql);

    return NextResponse.json(jobs);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
