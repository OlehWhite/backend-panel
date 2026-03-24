import { createUser, loginUser } from "@/services/user.service";
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await createUser(email, password)

    res
      .status(201)
      .json({
        email: user.email,
        id: user._id
      })
  } catch (err: any) {
    res
      .status(400)
      .json({ message: err.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password)

    const response = {
      token,
      user: {
        email: user.email,
        id: user._id
      }
    }

    res
      .status(200)
      .json(response)
  } catch (err: any) {
    res
      .status(400)
      .json({ message: err.message })
  }

}