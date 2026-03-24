import {
  BAD_REQUEST_ERROR,
  CONFLICT_ERROR,
  ERROR_400,
  ERROR_401,
  ERROR_404,
  ERROR_409,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR
} from "@/constants/errors.constants"

export class AppError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}

export class BadRequestError extends AppError {
  constructor(message = BAD_REQUEST_ERROR) {
    super(ERROR_400, message)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = UNAUTHORIZED_ERROR) {
    super(ERROR_401, message)
  }
}

export class NotFoundError extends AppError {
  constructor(message = NOT_FOUND_ERROR) {
    super(ERROR_404, message)
  }
}

export class ConflictError extends AppError {
  constructor(message = CONFLICT_ERROR) {
    super(ERROR_409, message)
  }
}

