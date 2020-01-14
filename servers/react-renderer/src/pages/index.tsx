import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { withStore, useStore } from '~/store'

const PageIndex: NextPage = () => {
  const store = useStore()

  const onLogoutButtonClick = async () => {
    await axios.get('/api/auth/logout')
    location.reload()
  }

  return (
    <div>
      Hello, {store.user?.nickname}
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
