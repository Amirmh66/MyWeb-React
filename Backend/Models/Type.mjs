import mongoose, { Schema } from "mongoose";

const Type = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      minlenght: 3,
      maxlength: 50,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: false,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 60,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: false,
    },
    description: {
      type: String,
      required: false,
      minlength: 10,
      maxlength: 500,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      maxlength: 200,
      trim: true,
    },
  },
  { timestamps: true }
);

Type.pre("save", function (next) {
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

export default mongoose.model("type", Type);
