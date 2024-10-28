import mongoose from "mongoose";

const User = mongoose.Schema({
  fullName: {
    type: String,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  role: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  updateAt: {
    type: String,
  },
});

export default mongoose.model("Users", User);
