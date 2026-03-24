import { BCRYPT_SALT_ROUNDS } from "@/constants";
import { INVALID_CREDENTIALS_ERROR, NOT_FOUND_ERROR, USER_ALREADY_EXISTS_ERROR } from "@/constants/errors.constants";
import { User } from "@/models/user.model";
import { generateToken, normalizedEmail } from "@/utils";
import { ConflictError, NotFoundError, UnauthorizedError } from "@/utils/errors";
import bcrypt from 'bcrypt';

export const createUser = async (email: string, password: string) => {
  const normEmail = normalizedEmail(email)

  const existingUser = await User.findOne({ email: normEmail })

  if (existingUser) {
    throw new ConflictError(USER_ALREADY_EXISTS_ERROR)
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)

  const result = {
    email: normEmail,
    password: hashedPassword
  }

  return User.create(result)
}

export const loginUser = async (email: string, password: string) => {
  const normEmail = normalizedEmail(email)

  const user = await User.findOne({ email: normEmail })

  if (!user) {
    throw new UnauthorizedError(INVALID_CREDENTIALS_ERROR)
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new UnauthorizedError(INVALID_CREDENTIALS_ERROR)
  }

  const token = generateToken(user._id.toString())

  return { user, token }
}

export const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id)

  if (!user) {
    throw new NotFoundError(NOT_FOUND_ERROR)
  }

  return user
}


