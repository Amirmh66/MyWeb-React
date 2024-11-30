import Product from "../Models/Product.mjs";

export const GetProduct = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  try {
    const products = await Product.find().skip(skip).limit(limit);
    const totalCount = await Product.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    res.json({
      products,
      totalCount,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const GetProductById = async (req, res) => {
  try {
    const Products = await Product.findById(req.params.id);
    res.json(Products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const saveProduct = async (req, res) => {
  const prodcutName = req.body.name;
  const isExistProduct = await Product.findOne({ name: prodcutName });
  if (!isExistProduct) {
    try {
      const newProduct = new Product(req.body);
      const insertedProduct = await newProduct.save();
      res.json(insertedProduct);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res
      .status(400)
      .json("This Product with this name has already exist in database!!!");
  }
};
export const updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json("Product Edited");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.deleteOne({ _id: req.params.id });
    res.status(200).json("Product Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteAllProduct = async (req, res) => {
  try {
    const product = await Product.deleteMany({});
    res.status(200).json("AllProduct Deleted.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
