import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const date = searchParams.get('date');     // e.g. '2025-06-23'
    const regija = searchParams.get('region'); // renamed to regija
    const grad = searchParams.get('city');     // renamed to grad
    const type = searchParams.get('type');
    const sat = searchParams.get('sat');       // new filter by hour/time, optional

    let sql = 'SELECT * FROM events WHERE 1=1';
    const values: any[] = [];

    if (date) {
      sql += ' AND DATE(date) = ?';   // assuming your date column is `date` (timestamp)
      values.push(date);
    }
    if (regija) {
      sql += ' AND regija = ?';
      values.push(regija);
    }
    if (grad) {
      sql += ' AND grad = ?';
      values.push(grad);
    }
    if (type) {
      sql += ' AND type = ?';
      values.push(type);
    }
    if (sat) {
      sql += ' AND sat = ?';
      values.push(sat);
    }

    const [rows] = await pool.query(sql, values);
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export function POST(){
  
}