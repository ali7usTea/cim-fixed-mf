// import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const loginUrl = `${import.meta.env.VITE_PUBLIC_ENV_URL}/fixed/login`;
    // Create a response with JSON data
    // const jsonResponse = NextResponse.json({ message: 'Logged out successfully.', url: loginUrl });

    // Clear cookies
    // jsonResponse.headers.append('Set-Cookie', 'jwtToken=; HttpOnly; Path=/; Max-Age=0');
    // jsonResponse.headers.append('Set-Cookie', 'refreshToken=; HttpOnly; Path=/; Max-Age=0');

    // return jsonResponse;
}
