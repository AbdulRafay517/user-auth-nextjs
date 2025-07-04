import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicRoute = path === "/login" || path === "/signup";
    const token = request.cookies.get("token")?.value || "";

    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    
    if (!isPublicRoute && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

export const config = {
    matcher: [
        "/profile/:path*",
        "/login",
        "/signup",
        "/",
    ],
}
