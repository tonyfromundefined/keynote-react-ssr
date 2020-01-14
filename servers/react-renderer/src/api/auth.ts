import to from 'await-to-js'
import axios from 'axios'
import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { API_ENDPOINT } from '~/constants'

const router = Router()

router.post('/login', asyncHandler(async (req, res) => {
  const [err, result] = await to(axios.post(API_ENDPOINT + '/auth/login', req.body))

  if (result?.data?.accessToken && result?.data?.refreshToken) {
    req.session.tokens = {
      accessToken: result.data.accessToken,
      refreshToken: result.data.refreshToken,
    }

    await new Promise((resolve) => req.session.save(() => resolve()))

    return res
      .status(200)
      .json({
        accessToken: result.data.accessToken,
      })

  } else {
    return res
      .status(400)
      .json({
        error: 'Error 4072: Login Failed',
      })
  }
}))

router.get('/refresh', asyncHandler(async (req, res) => {
  if (!req.session.tokens?.refreshToken) {
    return res
      .status(400)
      .json({
        error: 'Error 17929: Refresh Token is not exist',
      })
  }

  const [err, result] = await to(axios.post(API_ENDPOINT + '/auth/refresh', {
    refreshToken: req.session.tokens?.refreshToken,
  }))

  if (result?.data?.accessToken && result?.data?.refreshToken) {
    req.session.tokens = {
      accessToken: result.data.accessToken,
      refreshToken: result.data.refreshToken,
    }

    await new Promise((resolve) => req.session.save(() => resolve()))

    return res
      .status(200)
      .json({
        accessToken: result.data.accessToken,
      })

  } else {
    await new Promise((resolve) => req.session.destroy(() => resolve()))

    return res
      .status(400)
      .json({
        error: 'Error 35105: Token Refresh Failed',
      })
  }
}))

router.get('/logout', asyncHandler(async (req, res) => {
  await new Promise((resolve) => req.session.destroy(() => resolve()))

  return res
    .status(200)
    .json({})
}))

export default router
