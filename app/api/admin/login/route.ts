import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  // Get admin credentials from environment variables
  const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  // Validate credentials
  if (username === adminUsername && password === adminPassword) {
    // Set a secure HTTP-only cookie for authentication
    const cookieStore = cookies();
    (await cookieStore).set("admin-token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "strict",
    });

    return NextResponse.json({ success: true });
  }

  // Return error for invalid credentials
  return NextResponse.json(
    { success: false, message: "Invalid username or password" },
    { status: 401 }
  );
}
