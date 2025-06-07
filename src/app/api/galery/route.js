import pool from '@/lib/db.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sql = "SELECT url FROM galery";
    const [rows] = await pool.query(sql);

    if (rows.length === 0) {
      console.log("No data!");
      return NextResponse.json({ error: 'no data' }, { status: 401 });
    }

    return NextResponse.json({ pictures: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
