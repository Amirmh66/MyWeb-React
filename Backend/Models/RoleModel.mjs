import mongoose from "mongoose";

const Role = mongoose.Schema({
  name: {
    type: String,
  },
});

export default mongoose.model("Roles", Role);
