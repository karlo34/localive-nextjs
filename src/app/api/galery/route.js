import { createConnection } from '@/lib/db.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await createConnection();
    const sql = "SELECT url FROM galery";
    const [rows] = await db.query(sql);

    if (rows.length === 0) {
      console.log("No data!");
      return NextResponse.json({ error: 'no data' }, { status: 401 });
    }

    const pictures = rows;

    

    // Password matches, login successful
    const response = NextResponse.json({
      pictures
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
