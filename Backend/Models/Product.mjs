import mongoose, { Schema } from "mongoose";

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
  description: {
    type: String,
  },
  // category: {
  //   type: Schema.Types.ObjectId,
  //   ref: "categories",
  //   required: false,
  // },
  // type: {
  //   type: Schema.Types.ObjectId,
  //   ref: "types",
  //   required: false,
  // },
  // brand: {
  //   type: Schema.Types.ObjectId,
  //   ref: "brands",
  //   required: false,
  // },
});

export default mongoose.model("products", Product);