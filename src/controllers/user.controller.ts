import { User } from "@/models/user.model"
import { Request, Response } from "express"

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId

    const user = await User.findById(userId)

    if (!user) { throw new Error('User not found') }

    const response = {
      email: user.email,
      id: user._id
    }

    res.json(response)
  } catch (err: any) {
    res
      .status(500)
      .json({ message: err.message })
  }
}