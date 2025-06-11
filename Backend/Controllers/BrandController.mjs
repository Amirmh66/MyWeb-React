import Brand from "../Models/Brand.mjs";
import { validationResult } from "express-validator";

export const GetAllBrands = async (req, res) => {
  try {
    const response = await Brand.find().select(
      "name logoUrl websiteUrl countryOfOrigin establishedYear"
    );
    return res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const GetTypesInBrand = async (req, res) => {
  try {
    const response = await Brand.findById(req.params.id).populate(
      "types",
      "name"
    );
    return res.status(200).json({
      status: "success",
      message: response,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const GetBrandById = async (req, res) => {
  try {
    await Brand.findById(req.params.id).then((response) => {
      return res.status(200).json({
        status: "success",
        data: response,
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const saveBrand = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const brandIsExist = await Brand.findOne({ name: req.body.name });
    if (brandIsExist) {
      return res.status(409).json({
        status: "error",
        message: "A brand with this name already exists.",
      });
    }
    await Brand.create({
      ...req.body,
    });

    return res.status(201).json({
      status: "success",
      message: "Created brand successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const updateBrand = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await Brand.updateOne({ _id: req.params.id }, { $set: req.body });
    return res.status(200).json({
      status: "success",
      message: "Update Brand successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteBrand = async (req, res) => {
  try {
    await Brand.deleteOne({ _id: req.params.id }).then(() => {
      return res.status(200).json("Successfully deleteBrand!");
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
