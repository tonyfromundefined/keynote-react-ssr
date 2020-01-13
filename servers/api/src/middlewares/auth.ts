import { Handler } from 'express'
import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from '../constants'
import { User } from '../models'

declare global {
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}
export const hydrateUser: Handler = (req, _res, next) => {
  if (!req.headers.authorization) {
    return next()
  }

  const accessToken = req.headers.authorization.split(' ')[1]

  try {
    const payload: { userId: string } = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as any
    req.user = User.findOne({ where: { id: payload.userId }}) ?? undefined
  } catch (error) {}

  next()
}
