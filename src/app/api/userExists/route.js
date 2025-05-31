import { createConnection } from '@/lib/db.js';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const body = await request.json();
    const { Email, Password } = body;

    if (!Email || !Password) {
      return NextResponse.json({ error: 'Username and Password are required' }, { status: 400 });
    }

    const db = await createConnection();
    const sql = "SELECT id, name, email, password_hash FROM users WHERE email = ?";
    const [rows] = await db.query(sql, [Email]);

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
      Password: user.password_hash
    });

    // Set cookies with user data (example: userId, username, email)
    response.cookies.set('userId', String(user.id), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    response.cookies.set('username', user.name, {
      httpOnly: false, // visible to client-side JS
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    response.cookies.set('email', user.email, {
      httpOnly: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    response.cookies.set('gargamel', user.password_hash, {
      httpOnly: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    response.cookies.set('logedIn', "logedIn", {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

