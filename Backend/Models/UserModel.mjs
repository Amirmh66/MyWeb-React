import mongoose from "mongoose";

const User = mongoose.Schema({
  UserName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
  PhoneNumber: {
    type: Number,
  },
  PictureProf: {
    type: String,
  },
  Role: {
    type: String,
  },
  CreatedAt: {
    type: Date,
  },
  UpdateAt: {
    type: Date,
  },
});

export default mongoose.model("Users", User);
