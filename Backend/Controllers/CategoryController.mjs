import Category from "../Models/Category.mjs";

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
  const category = req.body;
  const categoryIsExist = await Category.findOne({ name: category.name });
  if (!categoryIsExist) {
    const category = new Category(req.body);
    try {
      const insertedCategory = await category.save();
      res.json(insertedCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(400).json("This category already exsit in database!");
  }
};
export const updateCategory = async (req, res) => {
  try {
    await Category.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.id });
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteAllCategories = async (req, res) => {
  try {
    await Category.deleteMany({});
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
