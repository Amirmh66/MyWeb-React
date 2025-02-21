import express from "express";
import {
  defaultSetting,
  getSettingsByGroup,
} from "../Controllers/SettingController.mjs";

const router = express.Router();

router.get("/applyDefaultSetting", defaultSetting);
router.get("/getSettings", getSettingsByGroup);

export default router;
