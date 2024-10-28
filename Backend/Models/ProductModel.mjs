import mongoose from "mongoose";

const Product = mongoose.Schema({
  category: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  stock: {
    type: String,
  },
  summary: {
    type: String,
  },
  description: {
    type: String,
  },
});

export default mongoose.model("Products", Product);
