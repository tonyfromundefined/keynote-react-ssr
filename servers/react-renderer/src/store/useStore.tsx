import { MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import { Store } from './store'

export function useStore() {
  return useContext<{ store: Store }>(MobXProviderContext).store
}
