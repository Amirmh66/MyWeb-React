import Category from "../Models/Category.mjs";
import { validationResult } from "express-validator";

export const GetAllCategory = async (req, res) => {
  try {
    const categories = await Category.find()
      .select("name imageUrl")
      .populate("types", "name");
    return res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const GetCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    return res.json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const GetCategoryTypesById = async (req, res) => {
  const categoryId = req.params.id;
  try {
    await Category.findById(categoryId)
      .populate("types")
      .then((response) => {
        res.status(200).json(response);
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const saveCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const categoryIsExist = await Category.findOne({ name: req.body.name });
    if (categoryIsExist) {
      return res.status(400).json("This category already exsit !");
    }
    const category = new Category(req.body);
    await category.save();
    return res.status(201).json({
      status: "success",
      message: "Category created successfully !",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    await Category.updateOne({ _id: req.params.id }, { $set: req.body });
    return res.status(200).json({
      status: "success",
      message: "Category Updated.",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
