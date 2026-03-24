import { User } from "@/models/user.model";
import { generateToken } from "@/utils/generateToken";
import bcrypt from 'bcrypt';

export const createUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) { throw new Error('User already exists') }

  const hashedPassword = await bcrypt.hash(password, 10)

  return User.create({ email, password: hashedPassword })
}

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email })
  if (!user) { throw new Error('User not found') }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) { throw new Error('Password is incorrect') }

  const token = generateToken(user._id.toString())

  return { user, token }
}

export const deleteUser = async (id: string) => {
  const user = await User.findById(id)
  if (!user) { throw new Error('User not found') }

  return User.findByIdAndDelete({ id })
}


