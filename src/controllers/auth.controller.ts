import { INVALID_REFRESH_TOKEN_ERROR, NO_REFRESH_TOKEN_ERROR } from "@/constants";
import { User } from "@/models";
import { createUser, loginUser } from "@/services";
import { generateAccessToken, generateRefreshToken, UnauthorizedError } from "@/utils";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

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
  const { user, accessToken, refreshToken } = await loginUser(email, password)

  const response = {
    accessToken,
    refreshToken,
    user: {
      email: user.email,
      id: user._id
    }
  }

  res
    .status(200)
    .json(response)
}

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new UnauthorizedError(NO_REFRESH_TOKEN_ERROR)
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string; tokenVersion: number }
  const user = await User.findById(decoded.id)

  if (!user || user.refreshToken !== refreshToken || decoded.tokenVersion !== user.tokenVersion) {
    throw new UnauthorizedError(INVALID_REFRESH_TOKEN_ERROR)
  }

  user.tokenVersion += 1
  const newAccessToken = generateAccessToken(user._id.toString(), user.tokenVersion)
  const newRefreshToken = generateRefreshToken(user._id.toString(), user.tokenVersion)
  user.refreshToken = newRefreshToken
  await user.save()

  res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
}