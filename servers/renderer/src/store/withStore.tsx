import to from 'await-to-js'
import { useStaticRendering, Provider as StoreProvider } from 'mobx-react'
import { NextPage } from 'next'
import { IS_SERVER } from '~/constants'
import { Store, createStore } from './store'

useStaticRendering(true)

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
      const [err] = await to(store.__NEXT_SERVER_INIT__(context.req as any, context.res as any))

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
