// Dynamic route : ID based

import { connectDB } from "@/lib/db.js";
import Problem from "@/models/Problem.js";
import Topic from "@/models/Topic.js";
import { NextResponse } from "next/server";

// UPDATE problem
export async function PUT(req, context) {
    await connectDB();
    const { id } = await context.params;
    const updateData = {};
    const { sno, name, difficulty, links } = await req.json();
    if (sno !== undefined) updateData.sno = Number(sno);
    if (name) updateData.name = name;
    if (difficulty) updateData.difficulty = difficulty;
    if (links) updateData.links = links;
    const updated = await Problem.findByIdAndUpdate(id, updateData, { returnDocument: "after" });
    return NextResponse.json(updated);
}

// DELETE problem
export async function DELETE(req, context) {
    await connectDB();
    const { id } = await context.params;
    const problem = await Problem.findByIdAndDelete(id);
    if (problem) {
        await Topic.findByIdAndUpdate(problem.topic, {
            $inc: { total: -1 },
        });
    }
    return NextResponse.json({ success: true });
}

