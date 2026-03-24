import { UNAUTHORIZED_ERROR } from "@/constants";
import { InternalServerError, UnauthorizedError } from "@/utils";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR))
  }

  const token = authHeader.split(' ')[1]
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    return next(new InternalServerError())
  }

  try {
    const decoded = jwt.verify(token, jwtSecret)

    const isJWTError = !decoded ||
      typeof decoded === 'string' ||
      !('id' in decoded) ||
      typeof decoded.id !== 'string'

    if (isJWTError) {
      return next(new UnauthorizedError(UNAUTHORIZED_ERROR))
    }

    ; (req as any).userId = decoded.id

  } catch {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR))
  }

  next()
}
