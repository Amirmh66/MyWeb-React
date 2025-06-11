import User from "../Models/User.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUpUser = async (req, res) => {
  try {
    const isUserExsit = await User.findOne({ email: req.body.email });
    if (isUserExsit) {
      return res.status(400).json({ message: "this email already SignUp!" });
    }
    req.body.role = "6845cf39f6e70fc8cd2636c5";
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json({ message: "User Successfully SignUp." });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error,
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const user = req.body;
    const userIsExsit = await User.findOne({ email: user.email }).populate(
      "role",
      "name"
    );
    if (!userIsExsit) {
      return res.status(404).json({
        message:
          "A user with these credentials was not found. Please check your info!",
      });
    }
    const isMatch = await bcrypt.compare(user.password, userIsExsit.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Email or Password is Not Valid!",
      });
    } else {
      const token = jwt.sign(
        { id: userIsExsit._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      return res.status(200).json({
        accessToken: token,
        id: userIsExsit.id,
        email: userIsExsit.email,
        role: userIsExsit.role.name,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error,
    });
  }
};
