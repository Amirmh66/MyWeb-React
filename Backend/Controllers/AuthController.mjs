import User from "../Models/UserModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment-jalaali";

export const signUpUser = async (req, res) => {
  const user = req.body;

  const isUserExsit = await User.findOne({ email: user.email });

  if (!isUserExsit) {
    try {
      const currentData = moment().format("jYYYY/jM/jD HH:MM");
      const passwordHash = await bcrypt.hash(user.password, 10);
      user.createdAt = currentData;
      user.password = passwordHash;
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
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
  }
  const user = await User.findOne({ email });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Email or Password is Not Valid!" });
  } else {
    const accessToken = jwt.sign(
      {
        userName: user.userName,
        id: user._id,
        role: user.role,
      },
      "mySecretKey123",
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  }
};
