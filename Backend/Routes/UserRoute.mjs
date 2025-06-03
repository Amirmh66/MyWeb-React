import express from "express";
import {
  GetUsers,
  saveUser,
  GetUserById,
  updateUser,
  deleteUser,
  getUsersByRole,
  getCountUsers,
} from "../Controllers/UserController.mjs";

import validateUser from "../Validators/userValidator.mjs";

const router = express.Router();

router.get("/users", GetUsers);
router.get("/usersById", getUsersByRole);
router.get("/users/:id", GetUserById);
router.get("/getUserCount", getCountUsers);
router.post("/users", validateUser, saveUser);
router.patch("/users/:id", validateUser, updateUser);
router.delete("/users/:id", deleteUser);

export default router;
