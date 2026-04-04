// ADMIN login
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const [form, setForm] = useState({ username: "", password: "" });
    const router = useRouter();

    async function handleLogin(e) {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!res.ok) {
            alert("Invalid credentials");
            return;
        }
        router.push("/");
    }

    return (
        <div className="flex items-center justify-center bg-slate-950 pt-10">
            <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md">

                <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>

                <input type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="w-full mb-4 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none" />

                <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full mb-6 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none" />

                <button type="submit" className="w-full hover:cursor-pointer bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-medium">Login</button>

            </form>
        </div>
    );
}

