import { SUCCESS_204, UNAUTHORIZED_ERROR } from "@/constants"
import { deleteUser } from "@/services"
import { UnauthorizedError } from "@/utils"
import { Request, Response } from "express"

export const getMe = async (req: Request, res: Response) => {
  const user = req.user

  if (!user) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR)
  }

  const response = {
    email: user.email,
    id: user.id
  }

  res.json(response)
}

export const deleteMe = async (req: Request, res: Response) => {
  const user = req.user

  if (!user) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR)
  }

  await deleteUser(user.id)
  res.status(SUCCESS_204).send()
}