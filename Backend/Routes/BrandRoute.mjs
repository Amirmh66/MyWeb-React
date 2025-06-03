import express from "express";
import {
  GetAllBrands,
  GetBrandById,
  saveBrand,
  updateBrand,
  deleteBrand,
  GetTypesInBrand,
} from "../Controllers/BrandController.mjs";
import brandValidationRules from "../Validators/brandValidator.mjs";
const router = express.Router();

router.get("/brands", GetAllBrands);
router.get("/brands/:id", GetBrandById);
router.get("/brandTypes/:id", GetTypesInBrand);
router.post("/brands", brandValidationRules, saveBrand);
router.patch("/brands/:id", brandValidationRules, updateBrand);
router.delete("/brands/:id", deleteBrand);

export default router;
