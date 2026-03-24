import 'dotenv/config'
import app from './app'
import { connectDB } from './config/db'


const PORT = process.env.PORT || 4200

async function serverStart() {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })

  } catch (e) {
    console.error('Faild to start server: ', e)
    process.exit(1)
  }
}
serverStart()   