import { NextPageContext } from 'next'
import { IS_SERVER } from '../constants'
import { User } from '../types'

export class Store {
  user: User | null

  constructor(storeState: Partial<Store>) {
    this.user = storeState.user || null
  }

  async __NEXT_SERVER_INIT__(_req: NextPageContext['req'], _res: NextPageContext['res']) {
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
