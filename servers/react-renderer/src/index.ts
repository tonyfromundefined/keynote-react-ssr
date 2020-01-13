import express from 'express'
import next from 'next'
import { IS_PROD } from './constants'
import conf from './next.config'
import { session } from './middlewares'

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

  app.use(session())

  app.get('/health', (_req, res) => res.json('ok'))
  app.all('*', (req, res) => render(req, res))

  app.listen(PORT, () => {
    console.log('React Renderer is running on http://localhost:' + PORT)
  })
}

bootstrap()
