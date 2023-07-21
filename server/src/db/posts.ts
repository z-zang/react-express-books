import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    // postId
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    actionType: { type: String },
    details: {}
}, { timestamps: true })

export const PostModel = mongoose.model('Post', PostSchema)