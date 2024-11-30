import express from "express";
import {
  GetCategory,
  saveCategory,
  GetCategoryById,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
  GetCategoryTypesById,
} from "../Controllers/CategoryController.mjs";

const router = express.Router();

router.get("/categories", GetCategory);
router.post("/categories", saveCategory);
router.get("/categories/:id", GetCategoryById);
router.get("/categoryTypes/:id", GetCategoryTypesById);
router.patch("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);
router.delete("/categories/", deleteAllCategories);

export default router;
