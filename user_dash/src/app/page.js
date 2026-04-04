"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {

  const [topics, setTopics] = useState([]);

  async function getTopics() {
    const res = await fetch("/api/topics");
    const data = await res.json();
    setTopics(data);
  }

  useEffect(() => {
    getTopics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold text-white my-3">DSA Topics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Topic Cards */}
        {topics.map((topic) => (<Link key={topic._id} href={`/topics/${topic._id}`}>

          <div className="group relative rounded-2xl p-px bg-linear-to-br from-slate-700/40 to-slate-800/40 
            hover:from-cyan-500/50 hover:to-blue-500/50 transition duration-300 hover:scale-[1.04]">

            {/* Glow layer */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition duration-300 
              bg-linear-to-r from-cyan-500/20 to-blue-500/20" />

            {/* Inner Card */}
            <div className="relative bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 h-full border border-slate-800
              shadow-lg shadow-black/40 transition duration-300 group-hover:bg-slate-800/90 group-hover:shadow-cyan-500/20">

              <h2 className="text-white text-xl font-semibold mb-4 tracking-wide">{topic.name}</h2>
              <p className="text-slate-400 text-sm">Total Problems</p>
              <p className="text-2xl text-white font-bold mt-1">{topic.total}</p>

            </div>

          </div>

        </Link>
        ))}

      </div>

    </div>
  );
}