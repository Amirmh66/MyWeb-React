import mongoose from "mongoose";

const Brand = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: false,
      minlength: 2,
      maxlength: 100,
    },
    slug: {
      type: String,
      trim: true,
      required: false,
      minlength: 3,
      maxlength: 200,
    },
    logoUrl: {
      type: String,
      required: false,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    websiteUrl: {
      type: String,
      required: false,
      trim: true,
      maxlength: 200,
    },
    countryOfOrigin: {
      type: String,
      required: false,
      trim: true,
      maxlength: 50,
    },
    establishedYear: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

Brand.pre("save", function (next) {
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

export default mongoose.model("brand", Brand);
