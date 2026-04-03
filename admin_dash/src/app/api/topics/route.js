import { connectDB } from "@/lib/db";
import Topic from "@/models/Topic.js";
import { NextResponse } from "next/server";

// GET all topics
export async function GET() {
    await connectDB();
    const topics = await Topic.find().sort({ priority: 1 });
    return NextResponse.json(topics);
}

// ADD topic 
export async function POST(req) {
    await connectDB();
    const { name, priority } = await req.json();
    const topic = await Topic.create({ name, total: 0, priority: Number(priority), });
    return NextResponse.json(topic);
}

