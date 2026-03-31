import { UNAUTHORIZED_ERROR } from '@/constants'
import { User } from '@/models'
import { InternalServerError, UnauthorizedError } from '@/utils'
import { NextFunction, Request, Response } from 'express'

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId

    const user = await User.findById(userId)

    if (!user) {
      return next(new UnauthorizedError(UNAUTHORIZED_ERROR))
    }

    ; req.user = {
      id: user._id.toString(),
      email: user.email
    }

    next()
  } catch {
    return next(new InternalServerError())
  }
}