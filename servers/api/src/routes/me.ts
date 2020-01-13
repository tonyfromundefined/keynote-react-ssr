import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({
        error: 'Error 7070: Unauthorized',
      })
  }

  return res
    .status(200)
    .json(req.user)
})

export default router
