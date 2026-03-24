import { deleteUser } from "@/services"
import { Request, Response } from "express"

export const getMe = async (req: Request, res: Response) => {
  const user = (req as any).user

  const response = {
    email: user.email,
    id: user._id
  }

  res.json(response)
}

export const deleteMe = async (req: Request, res: Response) => {
  const user = (req as any).user
  await deleteUser(user._id)
}