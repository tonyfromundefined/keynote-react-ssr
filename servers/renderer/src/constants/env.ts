export const IS_PROD = process.env.NODE_ENV === 'production'
export const IS_SERVER = typeof window === 'undefined'
