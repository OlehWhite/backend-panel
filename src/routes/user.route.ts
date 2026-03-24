import { getMe } from "@/controllers/user.controller";
import { authMiddleware } from "@/middleweares/auth.middleware";
import { Router } from "express";

const router = Router()

router.get('/me', authMiddleware, getMe)

export default router