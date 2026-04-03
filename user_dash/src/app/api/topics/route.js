// GET all topics
import { connectDB } from "@/lib/db.js";
import Topic from "@/models/Topic.js";
import { NextResponse } from "next/server";
export async function GET() {
    await connectDB();
    const topics = await Topic.find({}).sort({ priority: 1 });
    return NextResponse.json(topics);
}
