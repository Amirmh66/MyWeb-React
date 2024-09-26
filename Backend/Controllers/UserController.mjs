import Product from "../Models/ProductModel.mjs";

export const GetProduct = async (req, res) => {
  let product = [];
  try {
    const Products = await Product.find();
    res.json(Products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const insertedProduct = await product.save();
    res.json(insertedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
