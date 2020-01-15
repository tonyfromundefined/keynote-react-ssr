declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    API_ENDPOINT: string
    SESSION_SECRET: string
    REDIS_HOST: string
    REDIS_PORT: string
    REDIS_DB: string
  }
}
