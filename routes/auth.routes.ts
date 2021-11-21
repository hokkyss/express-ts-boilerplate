import { Router } from 'express'

// import { authController } from '../controller'
import { verifyToken } from '../middlewares'

const authRoute = Router()

authRoute.get('/me', verifyToken)

export default authRoute
