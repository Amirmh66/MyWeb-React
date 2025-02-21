import mongoose from "mongoose";

const Setting = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    uniqe: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  group: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Setting", Setting);
