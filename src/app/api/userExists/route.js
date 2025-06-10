import pool from '@/lib/db.js';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const body = await request.json();
    const { Email, Password } = body;

    if (!Email || !Password) {
      return NextResponse.json({ error: 'Username and Password are required' }, { status: 400 });
    }

    const sql = "SELECT id, name, email, password_hash, role FROM users WHERE email = ?";
    const [rows] = await pool.query(sql, [Email]);

    if (rows.length === 0) {
      console.log("No user!");
      return NextResponse.json({ error: 'Invalid username' }, { status: 401 });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(Password, user.password_hash);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Password matches, login successful
    const response = NextResponse.json({
      message: 'Login successful',
      userId: user.id,
      username: user.name,
      Email: user.email,
      Role: user.role
    });

    // Set cookies with user data
    response.cookies.set('userId', String(user.id), {
      httpOnly: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 1, // 1 day
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    response.cookies.set('username', user.name, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 1,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    response.cookies.set('email', user.email, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 1,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    response.cookies.set('gargamel', user.password_hash, {
      httpOnly: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 1,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    response.cookies.set('role', user.role, {
      path: '/',
      maxAge: 60 * 60 * 24 * 1,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    
    response.cookies.set('logedIn', "logedIn", {
      path: '/',
      maxAge: 60 * 60 * 24 * 1,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
