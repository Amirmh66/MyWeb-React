import User from "../Models/User.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment-jalaali";
import dotenv from "dotenv";
dotenv.config();

export const signUpUser = async (req, res) => {
  const user = req.body;
  const isUserExsit = await User.findOne({ email: user.email });

  if (!isUserExsit) {
    try {
      const currentData = moment().format("jYYYY/jM/jD HH:MM");
      const passwordHash = await bcrypt.hash(user.password, 10);
      user.createdAt = currentData;
      user.password = passwordHash;
      user.role = "6724becca75536beb34a66eb";
      const newUser = new User(user);
      await newUser.save();
      res.status(201).json({ message: "User Successfully SignUp." });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(400).json({ message: "this email already SignUp!" });
  }
};

export const loginUser = async (req, res) => {
  const user = req.body;

  if (!user.email || !user.password) {
    res.status(400).json({ message: "information is not valid!" });
  }
  const userIsExsit = await User.findOne({ email: user.email }).populate(
    "role"
  );
  if (userIsExsit) {
    const isMatch = await bcrypt.compare(user.password, userIsExsit.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Email or Password is Not Valid!",
      });
    } else {
      const token = jwt.sign(
        { id: userIsExsit._id, userName: userIsExsit.userName },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      res.status(200).json({
        accessToken: token,
        id: userIsExsit.id,
        userName: userIsExsit.userName,
        role: userIsExsit.role.name,
      });
    }
  } else {
    res.status(404).json({
      message:
        "A user with these credentials was not found. Please check your info!",
    });
  }
};
