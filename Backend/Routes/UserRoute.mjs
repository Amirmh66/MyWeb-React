import express from "express";
import {
  GetAllUser,
  saveProduct,
  GetUserById,
  updateUser,
  deleteUser,
  deleteAllUser,
} from "../Controllers/UserController.mjs";

const router = express.Router();

router.get("/users", GetAllUser);
router.delete("/users", deleteAllUser);
router.get("/users/:id", GetUserById);
router.post("/users", saveProduct);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
