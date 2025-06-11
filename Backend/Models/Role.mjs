import mongoose from "mongoose";

const Role = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 14,
    },
  },
  { timestamps: true }
);

export default mongoose.model("role", Role);
