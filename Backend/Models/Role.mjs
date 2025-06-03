import mongoose from "mongoose";

const Role = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 14,
  },
});

export default mongoose.model("role", Role);
