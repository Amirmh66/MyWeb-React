import express from "express";
import {
  GetAllUser,
  saveUser,
  GetUserById,
  updateUser,
  deleteUser,
  deleteAllUser,
} from "../Controllers/UserController.mjs";

const router = express.Router();

router.get("/users", GetAllUser);
router.get("/users/:id", GetUserById);
router.post("/users", saveUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.delete("/users/", deleteAllUser);

export default router;
