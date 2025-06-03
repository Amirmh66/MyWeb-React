import Product from "../Models/Product.mjs";

export const GetProduct = async (req, res) => {
  const limit = parseInt(req.query.limit) || 7;
  try {
    const products = await Product.find()
      .limit(limit)
      .select("name price stock imageUrl status")
      .populate("brand", "name")
      .populate("type", "name")
      .populate("category", "name");
    return res.status(200).json({
      statsu: "success",
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const GetProductById = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    if (products) {
      return res.statsu(200).json({
        status: "success",
        data: products,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const saveProduct = async (req, res) => {
  try {
    const isExistProduct = await Product.findOne({ name: req.body.name });
    if (isExistProduct) {
      return res
        .status(400)
        .json("This Product with this name has already exist in database!!!");
    }
    const newProduct = new Product(req.body);
    const insertedProduct = await newProduct.save();
    return res.json({
      status: "success",
      data: insertedProduct,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const updateProduct = async (req, res) => {
  try {
    await Product.updateOne({ _id: req.params.id }, { $set: req.body });
    return res.status(200).json({
      status: "success",
      message: "Product Edited",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      statsu: "success",
      message: "Product Deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProductCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    return res.status(200).json(productCount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
