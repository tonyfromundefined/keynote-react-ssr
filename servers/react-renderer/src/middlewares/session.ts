import connectRedis from 'connect-redis'
import expressSession from 'express-session'
import redis from 'redis'
import { SESSION_SECRET, REDIS_HOST, REDIS_PORT, REDIS_DB } from '../constants'

export function session() {
  const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    db: REDIS_DB,
  })
  const RedisStore = connectRedis(expressSession)

  return expressSession({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    store: new RedisStore({
      client: redisClient,
    }),
  })
}
