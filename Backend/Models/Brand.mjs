import mongoose, { Schema } from "mongoose";

const Brand = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: String,
    required: false,
  },
});

export default mongoose.model("brands", Brand);
