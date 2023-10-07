import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import morgan from 'morgan'
import envConfig from './config/env.config'
import ErrorCodes from './constants/error.constant'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(
  morgan(
    '[:date[clf]] - :status ":method :url HTTP/:http-version" :response-time ms'
  )
)
app.use((_req, res, next) => {
  res
    .header('Access-Control-Allow-Headers', 'Origin, Content-type, Accept')
    .header('Content-type', 'application/json')
  next()
})
app.set('json spaces', 2)

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (createHttpError.isHttpError(err)) {
    return res.status(err.statusCode).json({ details: err.message })
  }
  return res.status(500).json({ details: ErrorCodes.InternalServerError })
})

app.listen(envConfig.port)

export default app
