import express from "express";
// import { UserModel } from "../models/userSchema.js";
import { register, login } from "../controller/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export { router as userRouter };
