import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the path starts with /admin and is not the login page
  const isAdminRoute = path.startsWith("/admin") && path !== "/admin/login";

  // Check if the user is authenticated
  const adminToken = request.cookies.get("admin-token")?.value;
  const isAuthenticated = adminToken === "authenticated";

  // If the user is trying to access an admin route but is not authenticated,
  // redirect them to the login page
  if (isAdminRoute && !isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If the user is already authenticated and trying to access the login page,
  // redirect them to the dashboard
  if (path === "/admin/login" && isAuthenticated) {
    const dashboardUrl = new URL("/admin", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Otherwise, continue with the request
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
