import mongoose from "mongoose";

const Category = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

export default mongoose.model("Categories", Category);
