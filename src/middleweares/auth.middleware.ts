import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    return res.status(500).json({ message: 'Server error' })
  }

  const decoded = jwt.verify(token, jwtSecret)

  const isJWTError = !decoded ||
    typeof decoded === 'string' ||
    !('id' in decoded) ||
    typeof decoded.id !== 'string'

  if (isJWTError) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  ; (req as any).userId = decoded.id

  next()
} 