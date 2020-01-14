import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { withStore, useStore } from '~/store'
import { useEffect } from 'react'
import { API_ENDPOINT } from '~/constants'

const PageIndex: NextPage = () => {
  const store = useStore()

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!store.isAuthenticated || !store.api) {
        return
      }

      const result = await store.api.get(API_ENDPOINT + '/me')
      console.log(result)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const onLogoutButtonClick = async () => {
    await axios.get('/api/auth/logout')
    location.reload()
  }

  return (
    <div>
      Hello, {store.user?.nickname || 'World'}
      <div>
        {store.isAuthenticated &&
          <button onClick={onLogoutButtonClick}>Logout</button>
        }
        {!store.isAuthenticated &&
          <Link href='/login' passHref>
            <a>Login</a>
          </Link>
        }
      </div>
    </div>
  )
}

export default withStore(PageIndex)
