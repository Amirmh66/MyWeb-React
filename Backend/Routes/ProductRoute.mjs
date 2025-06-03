import express from "express";
import {
  GetProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
  GetProductById,
  getProductCount,
} from "../Controllers/ProductController.mjs";
import validateProduct from "../Validators/productValidator.mjs";

const router = express.Router();

router.get("/products", GetProduct);
router.post("/products", validateProduct, saveProduct);
router.get("/products/:id", GetProductById);
router.get("/productsCount", getProductCount);
router.patch("/products/:id", validateProduct, updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
