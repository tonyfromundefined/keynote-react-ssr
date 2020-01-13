import to from 'await-to-js'
import { MobXProviderContext, useStaticRendering, Provider as StoreProvider } from 'mobx-react'
import { useContext } from 'react'
import { User } from '../types'
import { NextPage, NextPageContext } from 'next'

useStaticRendering(true)

const IS_SERVER = typeof window === 'undefined'

export class Store {
  user: User | null

  constructor(storeState: Partial<Store>) {
    this.user = storeState.user || null
  }

  async __NEXT_SERVER_INIT__(req: NextPageContext['req'], res: NextPageContext['res']) {
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

export function useStore() {
  return useContext<{ store: Store }>(MobXProviderContext).store
}

export function withStore(_App: NextPage): NextPage<{ __storeState: Store }> {
  const getAppProps = _App.getInitialProps

  const App: NextPage<{ __storeState: Store }> = ({ __storeState, ...appProps }) => {
    const store = createStore(__storeState)

    return (
      <StoreProvider store={store}>
        <_App {...appProps} />
      </StoreProvider>
    )
  }

  App.getInitialProps = async (context) => {
    const appProps = getAppProps ? await getAppProps(context) : {}
    const store = createStore({})

    if (IS_SERVER) {
      const [err] = await to(store.__NEXT_SERVER_INIT__(context.req, context.res))

      if (err) {
        console.error('Error 55266: __NEXT_SERVER_INIT__ failed')
      }
    }

    return {
      ...appProps,
      __storeState: store,
    }
  }

  return App
}
