import { createUser, loginUser } from "@/services";
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await createUser(email, password)

  res
    .status(201)
    .json({
      email: user.email,
      id: user._id
    })
}

export const login = async (req: Request, res: Response) => {
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
}