// GET all problems for some "TopicID"
import { connectDB } from "@/lib/db.js";
import Topic from "@/models/Topic.js";
import Problem from "@/models/Problem.js";
import { NextResponse } from "next/server";
export async function GET(req, context) {
    await connectDB();
    const { id } = await context.params;
    const topic = await Topic.findById(id);
    if (!topic) {
        return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }
    const problems = await Problem.find({ topic: id }).sort({ sno: 1 });
    return NextResponse.json({ topic, problems, });
}