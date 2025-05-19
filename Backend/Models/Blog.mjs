import mongoose, { Schema } from "mongoose";

const Blog = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog Title is required."],
      trim: true,
      maxlength: [80, "The title cannot be longer than 80 characters."],
    },
    slug: {
      type: String,
      required: false,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      maxlength: 160,
    },
    coverImage: {
      type: String,
      required: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Categories",
        required: true
      },
    ],
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "pending", "published", "archived"],
      defautl: "darft",
      required: true
    },
    publishedAt: {
      type: Date,
      immutable: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    readingTime: { type: Number, default : 0},
  },
  { timestamps: true }
);


export default mongoose.model("blog", Blog);
