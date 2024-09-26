import mongoose from "mongoose";

const Product = mongoose.Schema({
  Category_Id: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
  Stock: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Products", Product);
