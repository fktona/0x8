import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Clear the authentication cookie
  const cookieStore = cookies();
  (await cookieStore).delete("admin-token");

  // Redirect to the login page
  return NextResponse.json({ success: true }, { status: 200 });
}
