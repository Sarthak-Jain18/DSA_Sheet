import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    total: { type: Number },
    priority: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.models.Topic || mongoose.model("Topic", TopicSchema);
