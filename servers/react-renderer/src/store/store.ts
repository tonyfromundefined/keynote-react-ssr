import axios from 'axios'
import to from 'await-to-js'
import { action, computed } from 'mobx'
import { IS_SERVER, API_ENDPOINT } from '~/constants'
import { User } from '~/types'
import { Request, Response } from 'express'

export class Store {
  user: User | null
  accessToken: string | null

  constructor(storeState: Partial<Store>) {
    this.user = storeState.user || null
    this.accessToken = storeState.accessToken || null
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
  setAccessToken(accessToken: string) {
    this.accessToken = accessToken
  }

  async __NEXT_SERVER_INIT__(req: Request, _res: Response) {
    if (req.session.tokens?.accessToken) {
      this.setAccessToken(req.session.tokens.accessToken)
    }
    if (this.accessToken) {
      const [err, result] = await to(axios.get(API_ENDPOINT + '/me', {
        headers: {
          authorization: `Bearer ${this.accessToken}`,
        },
      }))

      if (result) {
        this.setUser(result.data)
      }
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
