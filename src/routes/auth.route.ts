import { login, register } from "@/controllers";
import { asyncHandler } from "@/middleweares";
import { Router } from "express";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;