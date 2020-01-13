import cors from 'cors'
import express from 'express'
import { IS_PROD } from './constants'
import { hydrateUser } from './middlewares'
import { auth, me } from './routes'

const PORT = IS_PROD ? 80 : 3000

async function bootstrap() {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(hydrateUser)

  app.use('/auth', auth)
  app.use('/me', me)

  app.get('/', (_req, res) => res.json('ok'))

  app.listen(PORT, () => {
    console.log('API Server is running on http://localhost:' + PORT)
  })
}

bootstrap()
