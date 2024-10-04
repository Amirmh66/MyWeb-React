import Category from "../Models/CategoryModel.mjs";

export const GetCategory = async (req, res) => {
  try {
    const Categories = await Category.find();
    res.json(Categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const GetCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const saveCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const insertedCategory = await category.save();
    res.json(insertedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const updateCategory = await Category.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json("Category Edited");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const deleteCategory = await Category.deleteOne({ _id: req.params.id });
    res.status(200).json("Category Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
