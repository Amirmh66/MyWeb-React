import mongoose, { Schema } from "mongoose";

const Category = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  types: [
    {
      type: Schema.Types.ObjectId,
      ref: "types",
    },
  ],
});

export default mongoose.model("categories", Category);
