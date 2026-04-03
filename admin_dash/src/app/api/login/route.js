import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
    const { username, password } = await req.json();
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const cookieStore = await cookies();
        cookieStore.set("admin_token", token, { httpOnly: true, secure: true, sameSite: "strict", path: "/", });
        return Response.json({ success: true });
    }
    return Response.json({ success: false }, { status: 401 });
}

