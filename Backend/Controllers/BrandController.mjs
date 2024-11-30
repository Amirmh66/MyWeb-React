import Brand from "../Models/Brand.mjs";

export const GetAllBrands = async (req, res) => {
  try {
    await Brand.find().then((response) => {
      res.json(response);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const GetTypesInBrand = async (req, res) => {
  const brandId = req.params.id;
  try {
    const response = await Brand.findById(brandId).populate("types");
    res.json(response.types);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const GetBrandById = async (req, res) => {
  const brandId = req.params.id;
  try {
    await Brand.findById(brandId).then((response) => {
      res.json(response);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const saveBrand = async (req, res) => {
  const brand = req.body;
  const brandIsExist = await Brand.findOne({ name: brand.name });
  if (!brandIsExist) {
    const newBrand = await new Brand(brand);
    try {
      const response = await newBrand.save();
      res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(400).json("This Brand is Already Exist!");
  }
};
export const updateBrand = async (req, res) => {
  try {
    await Brand.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteBrand = async (req, res) => {
  try {
    await Brand.deleteOne({ _id: req.params.id }).then(() => {
      res.status(200).json("Successfully deleteBrand!");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
