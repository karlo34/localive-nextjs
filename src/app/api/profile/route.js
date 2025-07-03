import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const uid = Number(userId);

    // Fetch user including new columns
    const [userRows] = await pool.query(
      `SELECT id, name, email, role, status, created_at,
              city, country, gender, birthday, points
       FROM users WHERE id = ?`,
      [uid]
    );
    if (userRows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const user = userRows[0];

    // Attended events
    const [attended] = await pool.query(
      `SELECT e.id, e.title, e.date, e.address, e.description
       FROM event_attendees ea
       JOIN events e ON ea.event_id = e.id
       WHERE ea.user_id = ?`,
      [uid]
    );

    // Job applications
    const [jobApps] = await pool.query(
      `SELECT j.id, j.title, j.company_name, j.created_at
       FROM job_applications ja
       JOIN jobs j ON ja.job_id = j.id
       WHERE ja.user_id = ?`,
      [uid]
    );

    // Volunteer applications
    const [volApps] = await pool.query(
      `SELECT v.id, v.title, v.organization_name, v.created_at
       FROM volunteer_applications va
       JOIN volunteer_positions v ON va.volunteer_position_id = v.id
       WHERE va.user_id = ?`,
      [uid]
    );

    // Reviews
    const [reviews] = await pool.query(
      `SELECT r.id, r.content, r.created_at
       FROM reviews r
       WHERE r.user_id = ?`,
      [uid]
    );

    // Gamification
    const [gamiRows] = await pool.query(
      `SELECT points, level, badges, last_updated
       FROM gamification WHERE user_id = ? LIMIT 1`,
      [uid]
    );
    const gamification = gamiRows[0] || null;

    // Stats for views
    const [evViews] = await pool.query(
      `SELECT COUNT(*) AS eventViews
       FROM event_views WHERE user_id = ?`,
      [uid]
    );
    const [jobViews] = await pool.query(
      `SELECT COUNT(*) AS jobViews
       FROM job_views WHERE user_id = ?`,
      [uid]
    );

    return NextResponse.json({
      user,
      attendedEvents: attended,
      jobApplications: jobApps,
      volunteerApplications: volApps,
      reviews,
      gamification,
      stats: {
        eventViews: evViews[0].eventViews || 0,
        jobViews: jobViews[0].jobViews || 0,
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}