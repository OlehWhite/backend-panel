import jwt from 'jsonwebtoken'

const accessSecret = process.env.JWT_SECRET!
const refreshSecret = process.env.JWT_REFRESH_SECRET!

export const generateAccessToken = (userId: string, tokenVersion: number) => {
  return jwt.sign({ id: userId, tokenVersion }, accessSecret, { expiresIn: '15m' })
}

export const generateRefreshToken = (userId: string, tokenVersion: number) => {
  return jwt.sign({ id: userId, tokenVersion }, refreshSecret, { expiresIn: '7d' })
}