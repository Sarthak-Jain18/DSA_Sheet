// Dynamic Route : Showing "DSA Problems" of "Topic ID"
"use client";
import { useEffect, useState } from "react";
import { SquarePen, Trash } from 'lucide-react';
import { useParams } from "next/navigation";

export default function TopicPage() {

    const { id } = useParams();
    const [problems, setProblems] = useState([]);
    const [topicName, setTopicName] = useState("");
    // ( ADD + EDIT ) problem states
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ sno: "", name: "", difficulty: "Easy", leetcode: "", gfg: "", });
    const [editingId, setEditingId] = useState(null);
    // DELETE problem states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    async function getProblems() {
        const res = await fetch(`/api/problems?topicID=${id}`);
        if (res.ok) {
            const data = await res.json();
            setProblems(data);
        }
    }

    async function getTopic() {
        const res = await fetch(`/api/topics/${id}`);
        const data = await res.json();
        setTopicName(data.name);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.sno) {
            alert("Problem S.No. required");
            return;
        }
        if (!form.name.trim()) {
            alert("Problem name required");
            return;
        }
        const payload = {
            sno: Number(form.sno), name: form.name,
            topic: id, difficulty: form.difficulty,
            links: { leetcode: form.leetcode, gfg: form.gfg, },
        };

        let res;
        if (editingId) {
            res = await fetch(`/api/problems/${editingId}`, {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });
        } else {
            res = await fetch(`/api/problems`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });
        }
        if (!res.ok) {
            alert("Failed to save problem");
            return;
        }
        setShowForm(false);
        setEditingId(null);
        setForm({ sno: "", name: "", difficulty: "Easy", leetcode: "", gfg: "", });
        getProblems();
    }

    useEffect(() => {
        if (id) {
            getProblems();
            getTopic();
        }
    }, [id]);

    function handleEdit(p) {
        setEditingId(p._id);
        setForm({
            sno: p.sno, name: p.name, difficulty: p.difficulty,
            leetcode: p.links?.leetcode || "", gfg: p.links?.gfg || "",
        });
        setShowForm(true);
    }

    function handleDelete(id) {
        setDeleteId(id);
        setShowDeleteModal(true);
    }

    async function confirmDelete() {
        const res = await fetch(`/api/problems/${deleteId}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            alert("Delete failed");
            return;
        }
        setShowDeleteModal(false);
        setDeleteId(null);
        getProblems();
    }

    return (
        <div className="min-h-screen mt-15 p-8 bg-slate-950 text-white">

            {/* Heading */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold">{topicName} Problems</h1>

                <button className="btn-blue"
                    onClick={() => {
                        setForm({ sno: "", name: "", difficulty: "Easy", leetcode: "", gfg: "", });
                        setEditingId(null);
                        setShowForm(true);
                    }}>
                    + Add Problem
                </button>
            </div>

            {/* Add Problem + Edit Problem */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <form onSubmit={handleSubmit}
                        className="bg-slate-900 border border-slate-800 p-6 rounded-xl w-full max-w-md">

                        <h2 className="text-lg mb-4">{editingId ? "Edit Problem" : "Add Problem"}</h2>

                        <input type="number" placeholder="Problem S.No." className="w-full mb-3 p-2 bg-slate-800 rounded"
                            value={form.sno} onChange={(e) => setForm({ ...form, sno: e.target.value })} />

                        <input placeholder="Problem Name" className="w-full mb-3 p-2 bg-slate-800 rounded"
                            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

                        <select className="w-full mb-3 p-2 bg-slate-800 rounded"
                            value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>

                        <input placeholder="LeetCode Link" className="w-full mb-3 p-2 bg-slate-800 rounded"
                            value={form.leetcode} onChange={(e) => setForm({ ...form, leetcode: e.target.value })} />

                        <input placeholder="GFG Link" className="w-full mb-4 p-2 bg-slate-800 rounded"
                            value={form.gfg} onChange={(e) => setForm({ ...form, gfg: e.target.value })} />

                        <div className="flex justify-end gap-3">
                            <button type="button" className="btn-gray" onClick={() => {
                                setShowForm(false); setEditingId(null);
                                setForm({ sno: "", name: "", difficulty: "Easy", leetcode: "", gfg: "", });
                            }}>
                                Cancel
                            </button>

                            <button className="btn-blue">
                                {editingId ? "Update" : "Add"}
                            </button>
                        </div>

                    </form>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl w-full max-w-md">

                        <h2 className="text-lg mb-4 text-white">Delete Problem</h2>

                        <p className="text-slate-300 mb-6">
                            Are you sure you want to delete this problem?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button className="btn-gray" onClick={() => { setShowDeleteModal(false); setDeleteId(null); }}>
                                Cancel
                            </button>

                            <button onClick={confirmDelete} className="btn-red">
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* TABLE */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-sm">

                    <thead className="bg-slate-800 text-slate-300">
                        <tr>
                            <th className="p-3">S.No.</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Difficulty</th>
                            <th className="p-3">Practice</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {problems.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-6 text-center text-slate-400">
                                    No problems found
                                </td>
                            </tr>
                        ) : (
                            problems.map((p) => (
                                <tr key={p._id} className="text-center group border-t border-slate-800 hover:bg-linear-to-r hover:from-slate-800 hover:to-slate-900">
                                    <td className="p-3">{p.sno}</td>
                                    <td className="p-3 text-left">{p.name}</td>
                                    {/* Difficulty */}
                                    <td className="p-3 text-left">
                                        <span className={p.difficulty === "Easy" ? "text-green-400"
                                            : p.difficulty === "Medium" ? "text-yellow-400" : "text-red-400"
                                        }>
                                            {p.difficulty}
                                        </span>
                                    </td>
                                    {/* Links */}
                                    <td className="py-3">
                                        <div className="flex justify-center gap-5">
                                            {/* LeetCode */}
                                            {p.links?.leetcode ? (
                                                <a href={p.links.leetcode} target="_blank">
                                                    <img src="/icons/leet.png" alt="leetcode"
                                                        className="w-5 h-5 m-0.5 hover:scale-110 transition" />
                                                </a>
                                            ) : (
                                                <span className="text-slate-500">NA</span>
                                            )}
                                            {/* GFG */}
                                            {p.links?.gfg ? (
                                                <a href={p.links.gfg} target="_blank">
                                                    <img src="/icons/geek.png" alt="gfg"
                                                        className="w-6 h-4 mt-1 hover:scale-110 transition" />
                                                </a>
                                            ) : (
                                                <span className="text-slate-500">NA</span>
                                            )}
                                        </div>
                                    </td>
                                    {/* Actions */}
                                    <td className="py-3">
                                        <div className="flex justify-center gap-5">
                                            <button onClick={() => handleEdit(p)}
                                                className="text-blue-400 cursor-pointer opacity-60 hover:opacity-100">
                                                <SquarePen />
                                            </button>
                                            <button onClick={() => handleDelete(p._id)}
                                                className="text-red-400 cursor-pointer opacity-60 hover:opacity-100">
                                                <Trash />
                                            </button>
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
