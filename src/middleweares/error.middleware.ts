import { CONFLICT_ERROR, INTERNAL_SERVER_ERROR } from '@/constants/errors.constants'
import { AppError, BadRequestError, ConflictError, InternalServerError } from '@/utils/errors'
import { NextFunction, Request, Response } from 'express'

const toAppError = (err: unknown): AppError => {
  if (err instanceof AppError) {
    return err
  }

  const e = err as { name?: string; code?: number; message?: string }

  if (e.name === 'ValidationError') {
    return new BadRequestError(e.message ?? 'Bad Request')
  }

  if (e.code === 11000) {
    return new ConflictError(CONFLICT_ERROR)
  }

  return new InternalServerError(INTERNAL_SERVER_ERROR)
}

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err)

  const appError = toAppError(err)

  return res.status(appError.statusCode).json({
    message: appError.message
  })
}