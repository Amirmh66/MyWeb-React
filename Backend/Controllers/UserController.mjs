import User from "../Models/UserModel.mjs";
import bcrypt from "bcrypt";
import moment from "moment-jalaali";

export const GetAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const GetUserById = async (req, res) => {
  const userid = req.params.id;
  try {
    const user = await User.findById(userid);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const saveUser = async (req, res) => {
  const user = req.body;
  const isUserExsit = await User.findOne({ email: user.email });

  if (!isUserExsit) {
    try {
      const currentData = moment().format("jYYYY/jM/jD");
      const hashPassword = await bcrypt.hash(user.password, 10);
      user.createdAt = currentData;
      user.password =hashPassword; 
      const newUser = new User(user);
      await newUser.save();
      res.status(201).json({ message: "User Successfully Registered." });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(400).json({ message: "this email already registered!" });
  }
};
export const updateUser = async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json("User Edited");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    res.status(200).json("User Deleted.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteAllUser = async (req, res) => {
  try {
    const user = await User.deleteMany({});
    res.status(200).json("Users Deleted.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
