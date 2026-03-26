import { login, refresh, register } from "@/controllers";
import { asyncHandler, validate } from "@/middleweares";
import { loginSchema, registerSchema } from "@/validators";
import { Router } from "express";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(register));
router.post("/login", validate(loginSchema), asyncHandler(login));
router.post("/refresh", asyncHandler(refresh));

export default router;