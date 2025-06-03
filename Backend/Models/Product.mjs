import mongoose, { Schema } from "mongoose";

const Product = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 200,
      minlength: 3,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 100000000,
    },
    stock: {
      type: String,
      required: true,
      min: 0,
      max: 100000,
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 2000,
    },
    slug: {
      type: String,
      required: false,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 250,
    },
    imageUrl: {
      type: String,
      required: false,
      maxlength: 500,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft", "out_of_stock"],
      default: "active",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: false,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "type",
      required: false,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "brand",
      required: false,
    },
  },
  { timestamps: true }
);

Product.pre("save", function (next) {
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

export default mongoose.model("product", Product);
