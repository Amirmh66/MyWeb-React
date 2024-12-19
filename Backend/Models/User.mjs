import mongoose, { Schema } from "mongoose";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

const User = mongoose.Schema({
  fullName: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    match: passwordRules,
  },
  phoneNumber: {
    type: Number,
    required: false,
    validator: function (v) {
      return /^[0-9]{11}$/.test(v);
    },
    message: (props) =>
      `${props.value} Mobile Number Must be exactly 11 digits.`,
  },
  imageUrl: {
    type: String,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "roles",
    required: true,
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: "products",
    required: false,
  }],
  createdAt: {
    type: Date,
    required: true,
    immutable: true,
  },
  updateAt: {
    type: Date,
    required: false,
  },
});

export default mongoose.model("users", User);
