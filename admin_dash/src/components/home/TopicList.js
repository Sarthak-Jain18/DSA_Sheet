"use client";
import { useEffect, useState } from "react";
import { SquarePen, Trash, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopicsList() {

    const router = useRouter();
    // ADD topic states
    const [topics, setTopics] = useState([]);
    const [form, setForm] = useState({ name: "", priority: "", });
    // EDIT topic states
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({ name: "", priority: "" });
    const [editingId, setEditingId] = useState(null);
    // DELETE topic states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    async function fetchTopics() {
        const res = await fetch("/api/topics");
        const data = await res.json();
        setTopics(data);
    }

    useEffect(() => {
        fetchTopics();
    }, []);

    async function addTopic(e) {
        e.preventDefault();
        if (!form.name.trim()) {
            alert("Topic name required");
            return;
        }
        const res = await fetch("/api/topics", {
            method: "POST",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
            alert("Error adding topic");
            return;
        }
        setForm({ name: "", priority: "" });
        fetchTopics();
    }

    function handleEdit(topic) {
        setEditForm({ name: topic.name, priority: topic.priority, });
        setEditingId(topic._id);
        setShowEditModal(true);
    }

    async function handleUpdate(e) {
        e.preventDefault();
        if (!editForm.name.trim()) {
            alert("Topic name required");
            return;
        }
        if (isNaN(editForm.priority)) {
            alert("Priority must be a number");
            return;
        }
        const res = await fetch(`/api/topics/${editingId}`, {
            method: "PUT",
            body: JSON.stringify({
                name: editForm.name,
                priority: Number(editForm.priority),
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            alert("Update failed");
            return;
        }
        setShowEditModal(false);
        setEditingId(null);
        fetchTopics();
    }

    function handleDelete(id) {
        setDeleteId(id);
        setShowDeleteModal(true);
    }

    async function confirmDelete() {
        const res = await fetch(`/api/topics/${deleteId}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            alert("Delete failed");
            return;
        }
        setShowDeleteModal(false);
        setDeleteId(null);
        fetchTopics();
    }

    return (
        <div className="mt-10">

            {/* Heading */}
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
                <p className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    DSA Topics List
                </p>
            </div>

            {/* Add Topic */}
            <form onSubmit={addTopic} className="max-w-7xl mx-auto px-6 flex gap-4 mb-8">

                <input type="text" placeholder="Topic Name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="px-3 py-2 bg-slate-800 border border-slate-700 rounded" />

                <input type="number" placeholder="Priority" value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="px-3 py-2 bg-slate-800 border border-slate-700 rounded" />

                <button type="submit" className="btn-blue">Add</button>

            </form>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

                    <form onSubmit={handleUpdate}
                        className="bg-slate-900 border border-slate-800 p-6 rounded-xl w-full max-w-md">

                        <h2 className="text-lg mb-4">Edit Topic</h2>

                        <input type="text" placeholder="Topic Name" value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full mb-3 p-2 bg-slate-800 rounded" />

                        <input type="number" placeholder="Priority" value={editForm.priority}
                            onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                            className="w-full mb-4 p-2 bg-slate-800 rounded" />

                        <div className="flex justify-end gap-3">
                            <button type="button" className="btn-gray"
                                onClick={() => { setShowEditModal(false); setEditingId(null); }}>
                                Cancel
                            </button>

                            <button className="btn-blue">
                                Update
                            </button>
                        </div>

                    </form>

                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl w-full max-w-md">

                        <h2 className="text-lg mb-4 text-white">Delete Topic</h2>

                        <p className="text-slate-300 mb-6">
                            Are you sure you want to delete this topic and all its problems?
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

            {/* Topic Table */}
            <div className="max-w-7xl mx-auto px-6">
                <table className="w-full border border-slate-800">

                    <thead>
                        <tr className="bg-slate-900">
                            <th className="p-3">S. No</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3">Total problems</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {topics.map((t) => (
                            <tr key={t._id} className="text-center group border-t border-slate-800 transition-all duration-200 
                                hover:bg-linear-to-r hover:from-slate-800 hover:to-slate-900 hover:shadow-md hover:shadow-black/40">
                                <td className="p-3">{t.priority}</td>
                                <td className="p-3 text-left">{t.name}</td>
                                <td className="p-3">{t.total}</td>
                                <td className="py-3">
                                    <div className="flex justify-center gap-5">
                                        <button onClick={() => handleEdit(t)}
                                            className="text-blue-400 cursor-pointer opacity-60 hover:opacity-100">
                                            <SquarePen />
                                        </button>
                                        <button onClick={() => handleDelete(t._id)}
                                            className="text-red-400 cursor-pointer opacity-60 hover:opacity-100">
                                            <Trash />
                                        </button>
                                        <button onClick={() => router.push(`/topics/${t._id}`)}
                                            className="text-blue-400 cursor-pointer opacity-60 hover:opacity-100">
                                            <ExternalLink />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
}
