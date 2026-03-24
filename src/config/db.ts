const mongoose = require('mongoose')

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test')

    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
} 