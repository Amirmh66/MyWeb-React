import express from "express";
import {
  GetUsers,
  saveUser,
  GetUserById,
  updateUser,
  deleteUser,
  deleteAllUser,
  getUsersByRole,
  getCountUsers,
} from "../Controllers/UserController.mjs";

const router = express.Router();

router.get("/users", GetUsers);
router.get("/usersById", getUsersByRole);
router.get("/users/:id", GetUserById);
router.get("/getUserCount", getCountUsers);
router.post("/users", saveUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.delete("/users/", deleteAllUser);

export default router;
