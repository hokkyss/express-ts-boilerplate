import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'

import { UNAUTHORIZED_MESSAGE, COOKIE } from '../constant'

export const verifyToken: RequestHandler = (req, res, next) => {
  const token: string = req.cookies[COOKIE]

  if (token) {
    if (process.env.SECRET) {
      jwt.verify(
        token,
        process.env.SECRET,
        {
          algorithms: ['HS256'],
        },
        (err, decoded) => {
          if (err) {
            return res.status(401).send(UNAUTHORIZED_MESSAGE)
          }
          res.locals.auth = { ...decoded }
          next()
        }
      )
    }
  } else {
    return res.status(401).send(UNAUTHORIZED_MESSAGE)
  }
}
