import { BCRYPT_SALT_ROUNDS, INVALID_CREDENTIALS_ERROR } from "@/constants/global";
import { User } from "@/models/user.model";
import { generateToken } from "@/utils/generate-token";
import { normalizedEmail } from "@/utils/normalized-email";
import bcrypt from 'bcrypt';

export const createUser = async (email: string, password: string) => {
  const normEmail = normalizedEmail(email)

  const existingUser = await User.findOne({ email: normEmail })

  if (existingUser) {
    throw new Error(INVALID_CREDENTIALS_ERROR)
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
    throw new Error(INVALID_CREDENTIALS_ERROR)
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error(INVALID_CREDENTIALS_ERROR)
  }

  const token = generateToken(user._id.toString())

  return { user, token }
}

export const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id)

  if (!user) {
    throw new Error(INVALID_CREDENTIALS_ERROR)
  }

  return user
}


