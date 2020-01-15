import axios, { AxiosInstance } from 'axios'
import to from 'await-to-js'
import { Request, Response } from 'express'
import { action, computed } from 'mobx'
import jwt from 'jsonwebtoken'
import { IS_SERVER, API_ENDPOINT } from '~/constants'
import { User } from '~/types'

export const SECOND = 1000

export class Store {
  user: User | null
  accessToken: string | null

  api: AxiosInstance | null

  constructor(storeState: Partial<Store>) {
    this.user = storeState.user || null
    this.accessToken = storeState.accessToken || null

    if (IS_SERVER) {
      this.api = null

    } else {
      this.api = axios.create()
      this.api.interceptors.request.use(async (config) => {
        if (!this.accessToken) {
          return config
        }

        const { exp } = jwt.decode(this.accessToken) as { exp: number }
        const isAccessTokenExpired = Date.now() + (5 * SECOND) >= exp * 1000

        if (isAccessTokenExpired) {
          const [err, result] = await to(axios.get('/api/auth/refresh'))

          if (err) {
            this.setAccessToken(null)
            return config
          }

          this.setAccessToken(result.data.accessToken)
        }

        config.headers.common.Authorization = `Bearer ${this.accessToken}`
        return config

      }, (err) => {
        return Promise.reject(err)
      })
    }
  }

  @computed
  get isAuthenticated() {
    return !!this.accessToken
  }

  @action
  setUser(user: User) {
    this.user = user
  }

  @action
  setAccessToken(accessToken: string | null) {
    this.accessToken = accessToken
  }

  @action
  async __NEXT_SERVER_INIT__(req: Request, _res: Response) {
    if (req.session.tokens?.accessToken) {
      this.setAccessToken(req.session.tokens.accessToken)
    }

    if (!this.accessToken) {
      return
    }

    const { exp } = jwt.decode(this.accessToken) as { exp: number }
    const isAccessTokenExpired = Date.now() + (5 * SECOND) >= exp * 1000

    if (!isAccessTokenExpired) {
      // Do nothing

    } else if (req.session.tokens?.refreshToken) {
      const [err, result] = await to(axios.post(API_ENDPOINT + '/auth/refresh', {
        refreshToken: req.session.tokens?.refreshToken
      }))

      if (err) {
        await new Promise((resolve) => req.session.destroy(() => resolve()))
        return
      }

      req.session.tokens = {
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      }

      await new Promise((resolve) => req.session.save(() => resolve()))

      this.setAccessToken(result.data.accessToken)

    } else {
      return
    }

    // Hydrate User
    const [err, result] = await to(axios.get(API_ENDPOINT + '/me', {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    }))

    if (result) {
      this.setUser(result.data)
    }

    return
  }
}

let store: Store | null = null

export function createStore(storeState: Partial<Store>) {
  if (IS_SERVER) {
    return new Store(storeState)

  } else {
    return store || (store = new Store(storeState))
  }
}
