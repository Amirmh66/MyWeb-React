import { signUpUser, loginUser } from "../Controllers/AuthController.mjs";
import validateLogin from "../Validators/loginValidator.mjs";
import validateSignup from "../Validators/signupValidator.mjs";
import express from "express";

const router = express.Router();

router.post("/signUp", validateSignup, signUpUser);
router.post("/login", validateLogin, loginUser);

export default router;
