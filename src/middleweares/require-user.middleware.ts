import { User } from '@/models/user.model'
import { NextFunction, Request, Response } from 'express'

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId

    const user = await User.findById(userId)

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    ; (req as any).user = user

    next()
  } catch {
    return res.status(500).json({ message: 'Server error' })
  }
}