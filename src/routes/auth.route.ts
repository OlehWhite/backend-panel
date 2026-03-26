import { login, register } from "@/controllers";
import { asyncHandler, validate } from "@/middleweares";
import { loginSchema, registerSchema } from "@/validators";
import { Router } from "express";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(register));
router.post("/login", validate(loginSchema), asyncHandler(login));

export default router;