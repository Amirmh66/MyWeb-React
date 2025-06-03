import mongoose, { Schema } from "mongoose";

const Category = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      minlength: 10,
      maxlength: 500,
      trim: true,
    },
    slug: {
      type: String,
      required: false,
      unique: true,
      lowercase: true,
      trim: true,
    },
    types: [
      {
        type: Schema.Types.ObjectId,
        ref: "type",
        required: false,
      },
    ],
    imageUrl: {
      type: String,
      required: false,
      maxlength: 200,
      trim: true,
    },
  },
  { timestamps: true }
);

Category.pre("save", function (next) {
  if (this.isNew || (this.isModified("name") && !this.slug)) {
    let baseSlug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/[^a-z0-9-]+/g);
    baseSlug = baseSlug.replace(/^-+|-+$/g, "");
    this.slug = baseSlug;
  }
  next();
});

export default mongoose.model("category", Category);
