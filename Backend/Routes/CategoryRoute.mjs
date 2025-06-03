import express from "express";
import {
  GetAllCategory,
  saveCategory,
  GetCategoryById,
  updateCategory,
  deleteCategory,
} from "../Controllers/CategoryController.mjs";

import validateCategory from "../Validators/categoryValidator.mjs";

const router = express.Router();

router.get("/categories", GetAllCategory);
router.post("/category", validateCategory, saveCategory);
router.get("/categories/:id", GetCategoryById);
router.patch("/categories/:id", validateCategory, updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
