import Role from "../Models/Role.mjs";

export const GetRole = async (req, res) => {
  try {
    const roles = await Role.find();
    return res.status(200).json({
      status: "success",
      data: roles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const GetRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).select(
      "name createdAt updatedAt"
    );
    return res.status(200).json({
      status: "success",
      data: role,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const saveRole = async (req, res) => {
  try {
    const role = await Role.findOne({ name: req.body.name });
    if (role) {
      return res.status(409).json("This role already exist in database!");
    }
    const newRole = new Role(req.body);
    await newRole.save();
    return res.status(201).json({
      status: "success",
      message: "Role created successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateRole = async (req, res) => {
  try {
    await Role.updateOne({ _id: req.params.id }, { $set: req.body });
    return res.status(200).json({
      status: "success",
      messag: "Role edited"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteRole = async (req, res) => {
  try {
    await Role.deleteOne({ _id: req.params.id });
   return res.status(200).json("Role Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};