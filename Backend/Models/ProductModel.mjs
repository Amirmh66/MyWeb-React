import mongoose from "mongoose";

const Product = mongoose.Schema({
  Category: {
    type: String
  },
  Name: {
    type: String
  },
  Price: {
    type: String
  },
  Stock: {
    type: String
  },
  Description: {
    type: String
  },
});

export default mongoose.model("Products", Product);
