import { NextFunction, Request, Response } from "express"

export const errorMiddleware = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message })
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  res.status(500).json({ message: 'Internal server error' })
}