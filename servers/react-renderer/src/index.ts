import 'tsconfig-paths/register'

import express from 'express'
import next from 'next'
import { IS_PROD } from '~/constants'
import { session } from '~/middlewares'
import conf from '~/next.config'
import api from './api'

const PORT = IS_PROD ? 80 : 3001

async function bootstrap() {
  const app = express()

  const renderer = next({
    conf,
    dev: !IS_PROD,
    dir: './src',
  })
  await renderer.prepare()

  const render = renderer.getRequestHandler()

  app.get('/health', (_req, res) => res.json('ok'))

  app.use(express.json())
  app.use(session())

  app.use('/api', api)
  app.all('*', (req, res) => render(req, res))

  app.listen(PORT, () => {
    console.log('React Renderer is running on http://localhost:' + PORT)
  })
}

bootstrap()
