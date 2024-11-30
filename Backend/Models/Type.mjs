import mongoose, { Schema } from "mongoose";

const Types = new mongoose.Schema({
  typeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

export default mongoose.model("types", Types);
