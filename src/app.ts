import authRoutes from '@/routes/auth.route'
import userRoutes from '@/routes/user.route'
import express from 'express'

const app = express()

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

export default app 