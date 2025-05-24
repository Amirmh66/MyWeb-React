import mongoose, { Schema } from "mongoose";

const Blog = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog Title is required."],
      trim: true,
      maxlength: 70,
      unique: true,
      minlength: 20,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      maxlength: 70,
      minlength: 5,
    },
    content: {
      type: String,
      required: true,
      maxlength: 15000,
      minlength: 500,
    },
    excerpt: {
      type: String,
      maxlength: 200,
      minlength: 50
    },
    coverImage: {
      type: String,
      required: true,
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
        required: false,
      },
    ],
    tags: [
      {
        type: String,
        required: false,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "pending", "published", "archived"],
      defautl: "darft",
      required: true,
    },
    publishedAt: {
      type: Date,
      immutable: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    readingTime: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("blog", Blog);
