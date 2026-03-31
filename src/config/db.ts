import mongoose from 'mongoose'
import { env } from './env'

const MONGO_URI = env.MONGO_URI

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)

    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
} 