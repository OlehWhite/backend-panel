import { deleteMe, getMe } from "@/controllers/user.controller";
import { authMiddleware } from "@/middleweares/auth.middleware";
import { requireUser } from "@/middleweares/require-user.middleware";
import { Router } from "express";

const router = Router()

router.get('/me', authMiddleware, requireUser, getMe)
router.delete('/me', authMiddleware, requireUser, deleteMe)

export default router