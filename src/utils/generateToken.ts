import jwt from 'jsonwebtoken'

export const generateToken = (id: string) => {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined')
  }

  return jwt.sign({ id }, jwtSecret, { expiresIn: '1h' })
}