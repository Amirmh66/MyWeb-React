import User from "../Models/User.mjs";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export const GetUsers = async (req, res) => {
  try {
    const users = await User.find({}, "userName _id role").populate({
      path: "role",
      select: "name _id",
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUsersByRole = async (req, res) => {
  const { role } = req.query;
  try {
    const filteredUsers = await User.find({ role }).populate({
      path: "role",
      select: "name _id",
    });
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
export const GetUserById = async (req, res) => {
  const userid = req.params.id;
  try {
    const user = await User.findById(userid)
      .populate({
        path: "role",
        select: "name _id",
      })
      .select("-password");
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const GetRoleUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findById(userId)
      .populate("roles")
      .then((response) => {
        res.status(200).json(response);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json({
      status: "success",
      message: "User successfully registered.",
      user: newUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({
      status: "success",
      message: "User Edited successfully",
    });
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
export const getCountUsers = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json(userCount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
