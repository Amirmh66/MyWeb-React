import express from "express";
import {
  GetRole,
  GetRoleById,
  saveRole,
  updateRole,
  deleteRole,
} from "../Controllers/RoleController.mjs";

const router = express.Router();

router.get("/roles", GetRole);
router.get("/roles/:id", GetRoleById);
router.post("/roles", saveRole);
router.patch("/roles/:id", updateRole);
router.delete("/roles/:id", deleteRole);

export default router;
