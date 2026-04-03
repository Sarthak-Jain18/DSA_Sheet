import { connectDB } from "@/lib/db.js";
import Problem from "@/models/Problem.js";
import Topic from "@/models/Topic.js";
import { NextResponse } from "next/server";

// GET all problems of "topicID"
export async function GET(req) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const topicID = searchParams.get("topicID");
    let query = {};
    if (topicID) query.topic = topicID;
    const problems = await Problem.find(query).populate("topic").sort({ sno: 1 });;
    return NextResponse.json(problems);
}

// ADD problem for "topicID"
export async function POST(req) {
    await connectDB();
    const { sno, name, topic, difficulty, links } = await req.json();
    // basic validation
    if (!name || !topic || !difficulty) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    // create problem
    const problem = await Problem.create({
        sno: Number(sno),
        name,
        topic, // ObjectId
        difficulty,
        links,
    });
    // increment topic total
    await Topic.findByIdAndUpdate(topic, {
        $inc: { total: 1 },
    });

    return NextResponse.json(problem);
}
