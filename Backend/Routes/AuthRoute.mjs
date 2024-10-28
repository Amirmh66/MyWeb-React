import { signUpUser, loginUser } from "../Controllers/AuthController.mjs";
import express from "express";

const router = express.Router();

router.post("/signUp", signUpUser);
router.post("/login", loginUser);

export default router;
