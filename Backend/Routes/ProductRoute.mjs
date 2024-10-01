import express from "express";
import {
  GetProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
  GetProductById,
} from "../Controllers/ProductController.mjs";

const router = express.Router();

router.get("/products", GetProduct);
router.post("/products", saveProduct);
router.get("/products/:id", GetProductById);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
