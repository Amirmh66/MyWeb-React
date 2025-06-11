import Type from "../Models/Type.mjs";

export const GetTypes = async (req, res) => {
  try {
    await Type.find()
      .select("name imageUrl")
      .populate("category", "name")
      .then((response) => {
        return res.status(200).json({
          status: "success",
          data: response,
        });
      });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const GetTypeById = async (req, res) => {
  try {
    const response = await Type.findById(req.params.id)
      .select("name slug description imageUrl slug createdAt updatedAt")
      .populate("category", "name");
    if (response) {
      return res.status(200).json({
        status: "success",
        data: response,
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "Not found any type!",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const saveType = async (req, res) => {
  try {
    const isExsitType = await Type.findOne({ name: req.body.name });
    if (!isExsitType) {
      const newType = await new Type(req.body);
      await newType.save();
      return res.status(200).json("Successfully Create type.");
    } else {
      return res.status(409).json({
        status: "error",
        message: "A type with this name is already exist !",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateType = async (req, res) => {
  try {
    await Type.updateOne({ _id: req.params.id }, { $set: req.body });
    return res.status(200).json({
      status: "success",
      message: "Type updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteType = async (req, res) => {
  try {
    await Type.deleteOne({
      _id: req.params.id,
    });
    return res.status(200).json({ message: `Remove this type successfully!` });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
