import User from "../Models/UserModel.mjs";

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
export const saveProduct = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const inserteduser = await newUser.save();
    res.json(inserteduser);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
