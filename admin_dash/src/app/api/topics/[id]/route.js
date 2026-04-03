// Dynamic route : ID based

import { connectDB } from "@/lib/db.js";
import Topic from "@/models/Topic.js";
import Problem from "@/models/Problem.js";
import { NextResponse } from "next/server";

// GET topic details
export async function GET(req, context) {
    await connectDB();
    const { id } = await context.params;
    const topic = await Topic.findById(id);
    return NextResponse.json(topic);
}

// UPDATE topic
export async function PUT(req, context) {
    await connectDB();
    const { id } = await context.params;
    const { name, priority } = await req.json();
    const updated = await Topic.findByIdAndUpdate(id, { name, priority: Number(priority) }, { returnDocument: "after" });
    return NextResponse.json(updated);
}

// DELETE topic
export async function DELETE(req, context) {
    await connectDB();
    const { id } = await context.params;
    // delete related problems too
    await Problem.deleteMany({ topic: id });
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}

