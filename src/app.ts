import { errorMiddleware } from '@/middleweares/error.middleware'
import { authRoutes, userRoutes } from '@/routes'
import express from 'express'

const app = express()

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use(errorMiddleware)

export default app 