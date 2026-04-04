"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TopicPage() {

    const { id } = useParams();
    const [problems, setProblems] = useState([]);
    const [topicName, setTopicName] = useState("");

    async function getProblems() {
        const res = await fetch(`/api/topics/${id}`);
        const data = await res.json();
        setProblems(data.problems || []);
        setTopicName(data.topic?.name || "");
    }

    useEffect(() => {
        if (id) getProblems();
    }, [id]);

    return (
        <div className="min-h-screen mx-20 p-12 bg-slate-950 text-white">

            <h1 className="text-3xl font-bold text-white mb-8">{topicName} Problems</h1>

            {/* TABLE */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-sm">

                    <thead className="bg-slate-800 text-slate-300">
                        <tr>
                            <th className="p-3">S. No.</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Difficulty</th>
                            <th className="p-3">Practice</th>
                        </tr>
                    </thead>

                    <tbody>
                        {problems.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-6 text-center text-slate-400">
                                    No problems found
                                </td>
                            </tr>
                        ) : (
                            problems.map((p) => (
                                <tr key={p._id} className="group border-t border-slate-800 hover:bg-linear-to-r hover:from-slate-800 hover:to-slate-900 text-center">
                                    <td className="p-3">{p.sno}</td>
                                    <td className="p-3 text-left">{p.name}</td>
                                    {/* Difficulty */}
                                    <td className="p-3 text-left">
                                        <span
                                            className={
                                                p.difficulty === "Easy" ? "text-green-400" : p.difficulty === "Medium"
                                                    ? "text-yellow-400" : "text-red-400"} >
                                            {p.difficulty}
                                        </span>
                                    </td>
                                    {/* Links */}
                                    <td className="py-3">
                                        <div className="flex justify-center gap-5">

                                            {p.links?.leetcode ? (
                                                <a href={p.links.leetcode} target="_blank">
                                                    <img src="/icons/leet.png" className="w-5 h-5 hover:scale-110" />
                                                </a>
                                            ) : (
                                                <span className="text-slate-500">NA</span>
                                            )}

                                            {p.links?.gfg ? (
                                                <a href={p.links.gfg} target="_blank">
                                                    <img src="/icons/geek.png" className="w-6 h-4 mt-1 hover:scale-110" />
                                                </a>
                                            ) : (
                                                <span className="text-slate-500">NA</span>
                                            )}

                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    );
}

