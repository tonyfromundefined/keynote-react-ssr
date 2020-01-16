import '../global.css'

import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'
import LogoImage from '~/assets/aws.svg'
import { withStore, useStore } from '~/store'

const PageIndex: NextPage = () => {
  const store = useStore()

  const onLogoutButtonClick = async () => {
    await axios.get('/api/auth/logout')
    location.reload()
  }

  return (
    <Container>
      <Logo src={LogoImage} />
      <Greeting>
        안녕하세요, {store.user?.nickname || '게스트'}
      </Greeting>
      <Form>
        {!store.isAuthenticated &&
          <Link href='/login' passHref>
            <Button>로그인</Button>
          </Link>
        }
        {store.isAuthenticated &&
          <Button onClick={onLogoutButtonClick}>
            로그아웃
          </Button>
        }
      </Form>
    </Container>
  )
}

const Container = styled.div`
  padding: 5rem 0;
  text-align: center;
`

const Logo = styled.img`
  width: 10rem;
  padding-bottom: 2rem;
`

const Greeting = styled.div`
  font-size: 2rem;
  padding-bottom: 1.75rem;
`

const Form = styled.div``

const Button = styled.a`
  text-decoration: none;
  color: #000;
  box-shadow: 0 0 0 1px #eee;
  background: #000;
  border-radius: .125rem;
  cursor: pointer;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  padding: 0 .925em;
  position: relative;
  color: #fff;
  text-decoration: none;
  transition: transform .2s, color .2s, background .2s, box-shadow .2s;
  user-select: none;

  &:active {
    transform: scale(.95);
  }
`

export default withStore(PageIndex)
