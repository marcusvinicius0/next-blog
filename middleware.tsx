import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
// export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/dashboard/user/:path*",
    "/dashboard/admin/:path*",
    "/api/user/:path*",
    "/api/admin/:path*",
  ],
};

// role base authorization - protect pages
export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    // @ts-ignore
    const userRole = req?.nextauth?.token?.user?.role;
    if (url?.includes("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: { // if there is no token, callback will not allow to access /admin;
      authorized: ({ token }) => {
        if (!token) {
          return false;
        }
      },
    },
  }
);
