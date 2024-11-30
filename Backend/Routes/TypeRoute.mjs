import express from "express";
import {
  GetTypeById,
  saveType,
  deleteType,
  GetTypes,
  updateType,
} from "../Controllers/TypeController.mjs";

const router = express.Router();

router.get("/types", GetTypes);
router.get("/types/:id", GetTypeById);
router.post("/types", saveType);
router.patch("/types/:id", updateType);
router.delete("/types/:id", deleteType);

export default router;
