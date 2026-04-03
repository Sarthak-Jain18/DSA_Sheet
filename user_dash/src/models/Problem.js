import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
    sno: { type: Number, required: true },
    name: { type: String, required: true },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true
    },
    links: {
        leetcode: { type: String, default: "" },
        gfg: { type: String, default: "" }
    },
    difficulty: {
        type: String, enum: ["Easy", "Medium", "Hard"], required: true
    }
}, { timestamps: true });

export default mongoose.models.Problem || mongoose.model("Problem", ProblemSchema);