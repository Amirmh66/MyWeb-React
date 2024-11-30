import Types from "../Models/Type.mjs";

export const GetTypes = async (req, res) => {
  try {
    await Types.find().then((response) => {
      res.json(response);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const GetTypeById = async (req, res) => {
  const typeId = req.params.id;
  try {
    await Types.findById(typeId).then((response) => {
      res.json(response);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const saveType = async (req, res) => {
  const name = req.body.typeName;
  if (!name || "" || null) {
    res.status(400).json("Field cannot be empty!");
  } else {
    const isExsitType = await Types.findOne({ typeName: name });
    if (!isExsitType) {
      const type = req.body;
      const newType = await new Types(type);
      try {
        await newType.save();
        res.status(200).json("Successfully Create type.");
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } else {
      res.status(400).json("This Type Already Exist!");
    }
  }
};
export const updateType = async (req, res) => {
  const typeId = req.params.id;
  const type = req.body;
  if (type.length < 0 || "" || null) {
    res.json({ message: "Field Is Required!" });
  }
  try {
    await Types.updateOne({ _id: typeId }, { $set: type });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteType = async (req, res) => {
  try {
    await Types.deleteOne({
      _id: req.params.id,
    });
    res.json({ message: `Remove this type successfully!` });
  } catch (error) {
    res.json({ message: error });
  }
};
