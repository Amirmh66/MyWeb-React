import mongoose from 'mongoose';


const Category = mongoose.Schema({
  Name: {
    type: String,
  },
  Description: {
    type: String,
  },
});

export default mongoose.model("Categories" ,Category)