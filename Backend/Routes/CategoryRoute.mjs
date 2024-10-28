import express from "express";
import {
  GetCategory,
  saveCategory,
  GetCategoryById,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} from "../Controllers/CategoryController.mjs";

const router = express.Router();

router.get("/categories", GetCategory);
router.post("/categories", saveCategory);
router.get("/categories/:id", GetCategoryById);
router.patch("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);
router.delete("/categories/",deleteAllCategories)

export default router;
