import { login, register } from "@/controllers/auth.controller";
import { asyncHandler } from "@/middleweares/async-handler.middleware";
import { Router } from "express";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;