import mongoose, { Schema } from "mongoose";

const Blog = mongoose.Schema({
  title: {
    type: String,
    required: [false, "Blog Title is required."],
    trim: true,
    maxlength: [100, "The title cannot be longer than 80 characters."],
  },
  slug: { type: String, required: false, unique: true, lowercase: true },
  content: { type: String, required: false },
  excerpt: { type: String, maxlength: 160 },
  coverImage: { type: String, required: false },
  author: { type: Schema.Types.ObjectId, ref: "Users", required: false },
  categories: [{ type: Schema.Types.ObjectId, ref: "Categories" }],
  tags: [{ type: String }],
  publishedAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  isPublished: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  readingTime: Number,
});

export default mongoose.model("blog", Blog);
