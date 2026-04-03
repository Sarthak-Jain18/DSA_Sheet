import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req) {
    const token = req.cookies.get("admin_token")?.value;
    const { pathname } = req.nextUrl;
    // Allow login API + login page
    if (pathname.startsWith("/api/login") || pathname === "/login") {
        return NextResponse.next();
    }
    // Block everything else if no token
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"], // protect EVERYTHING
};