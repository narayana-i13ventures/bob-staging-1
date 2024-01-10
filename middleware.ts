import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
// export { default } from 'next-auth/middleware'
const publicPaths = ["/images", "/public", "/favicon.ico"]; // Add any additional public paths here

export default async function middleware(req: any) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    // Check if the request URL matches any public paths
    const isPublicPath = publicPaths.some((publicPath) =>
        req.nextUrl.pathname.startsWith(publicPath)
    );

    if (isPublicPath) {
        // If the request is for a public path, allow it without authentication
        return NextResponse.next();
    }

    if (req.nextUrl.pathname.startsWith("/SignIn") && isAuthenticated) {
        return NextResponse.redirect(new URL("/Dashboard", req.url));
    }

    return await withAuth(req, {
        pages: {
            signIn: "/SignIn",
        },
    });
}
