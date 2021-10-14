const DEV = process.env.NODE_ENV === 'development'

import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import apicache from 'apicache'

const cache = apicache.middleware
const app = express().use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(cache('1 week'))
app.use((_req, res, next) => {
  res
    .header('Access-Control-Allow-Headers', 'Origin, Content-type, Accept')
    .header('Content-type', 'application/json')
  next()
})
app.set('json spaces', 2)

import authRoute from './routes/auth.routes'

app.use('/auth', authRoute)

const PORT = process.env.PORT || 8008

app.listen(PORT, () => {
  if (DEV) {
    console.log(
      `Server started on port ${PORT}! Visit http://localhost:${PORT}`
    )
  } else {
    console.log(`Server started on port ${PORT}!`)
  }
})

export default app
