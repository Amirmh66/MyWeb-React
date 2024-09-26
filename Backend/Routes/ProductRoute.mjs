import express from "express";
import {
  GetProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
} from "../Controllers/UserController.mjs";

const router = express.Router();

router.get("/products", GetProduct);
router.post("/products", saveProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
