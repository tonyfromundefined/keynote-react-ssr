import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../constants'

const router = Router()

router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({
        error: 'Error 6351: Username and Password is required',
      })
  }

  const user = User.findOne({
    where: {
      username: req.body.username,
    },
  })

  if (!user) {
    return res
      .status(403)
      .json({
        error: 'Error 7038: User not found',
      })

    } else if (user.password !== req.body.password) {
    return res
      .status(403)
      .json({
        error: 'Error 7038: User not found',
      })

  } else {
    const userId = user.id
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN })
    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN })

    return res
      .status(200)
      .json({
        accessToken,
        refreshToken,
      })
  }
})

router.post('/refresh', (req, res) => {
  if (!req.body.refreshToken) {
    return res
      .status(400)
      .json({
        error: 'Error 61058: Refresh token is required',
      })
  }

  try {
    const payload: { userId: string } = jwt.verify(req.body.refreshToken, REFRESH_TOKEN_SECRET) as any

    const userId = payload.userId
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN })
    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN })

    return res
      .status(200)
      .json({
        accessToken,
        refreshToken,
      })

  } catch (err) {
    return res
      .status(403)
      .json({
        error: 'Error 57533: Refresh token is not valid',
      })
  }
})

export default router
