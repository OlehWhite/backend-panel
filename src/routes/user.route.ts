import { deleteMe, getMe } from "@/controllers";
import { authMiddleware, requireUser } from "@/middleweares";
import { Router } from "express";

const router = Router()

router.get('/me', authMiddleware, requireUser, getMe)
router.delete('/me', authMiddleware, requireUser, deleteMe)

export default router