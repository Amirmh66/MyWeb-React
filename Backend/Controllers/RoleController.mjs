import Role from "../Models/Role.mjs";

export const GetRole = async (req, res) => {
  try {
    const Roles = await Role.find();
    res.json(Roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const GetRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    res.json(role);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const saveRole = async (req, res) => {
  const roleName = req.body.name;

  try {
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      const newRole = new Role({ name: roleName });
      const insertRole = await newRole.save();
      res.status(201).json(insertRole);
    } else {
      res.status(400).json("This role already exist in database!");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateRole = async (req, res) => {
  try {
    const updateRole = await Role.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json("Role Edited");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteRole = async (req, res) => {
  try {
    await Role.deleteOne({ _id: req.params.id });
    res.status(200).json("Role Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteAllRoles = async (req, res) => {
  try {
    const deleteRole = await Role.deleteMany({});
    res.status(200).json("AllRoles Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
