import User from "../Models/User.mjs";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export const GetUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("fullName imageUrl")
      .populate("role", "name");
    return res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUsersByRole = async (req, res) => {
  const { role } = req.query;
  try {
    const filteredUsers = await User.find({ role }).populate("role", "name");
    return res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
export const GetUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select(
        "fullName userName email phoneNumber imageUrl createdAt updatedAt"
      )
      .populate("role", "name");
    return res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const saveUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const isUserExist = await User.findOne({ email: req.body.email });
    if (isUserExist) {
      return res
        .status(409)
        .json({ message: "This email is already registered!" });
    }
    
    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json({
      status: "success",
      message: "User successfully registered.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    await User.updateOne({ _id: req.params.id }, { $set: req.body });
    return res.status(200).json({
      status: "success",
      message: "User Edited successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    return res.status(200).json("User Deleted.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCountUsers = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json(userCount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
