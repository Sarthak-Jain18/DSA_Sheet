"use client";
import Link from "next/link";

export default function Navbar() {

    async function handleLogout() {
        await fetch("/api/logout", { method: "POST" });
        window.location.href = "/login";
    }

    return (
        <nav className="w-full bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
            <Link href="/" className="flex items-center gap-2 text-white text-xl font-semibold tracking-tight hover:opacity-80 transition">
                <span className="text-blue-500">&lt;/&gt;</span> DSA Sheet
            </Link>
            <button onClick={handleLogout} className="btn-red">Log out</button>
        </nav>
    );
}
