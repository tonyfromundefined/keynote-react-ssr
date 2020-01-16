import '../global.css'

import axios from 'axios'
import { NextPage } from 'next'
import React, { useState } from 'react'
import styled from 'styled-components'
import LogoImage from '~/assets/aws.svg'
import { withStore } from '~/store'
import Input from '~/components/Input'
import Link from 'next/link'

const PageLogin: NextPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value)
  }
  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }
  const onLoginButtonClick = async () => {
    await axios.post('/api/auth/login', {
      username,
      password,
    })

    location.href = '/'
  }

  return (
    <Container>
      <Link href='/' passHref>
        <a>
          <Logo src={LogoImage} />
        </a>
      </Link>
      <Form>
        <Inputs>
          <Input
            title='아이디'
            placeholder='아이디'
            status='normal'
            type='text'
            value={username}
            onChange={onUsernameChange}
          />
          <Input
            title='비밀번호'
            placeholder='비밀번호'
            status='normal'
            type='password'
            value={password}
            onChange={onPasswordChange}
          />
          <ButtonGroup>
            <Button onClick={onLoginButtonClick}>로그인</Button>
          </ButtonGroup>
        </Inputs>
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
  padding-bottom: 1.75rem;
`

const Inputs = styled.div`
  max-width: 20rem;
  width: 100%;
  display: inline-block;
`

const Form = styled.div``

const ButtonGroup = styled.div``

const Button = styled.a`
  text-decoration: none;
  color: #000;
  box-shadow: 0 0 0 1px #eee;
  background: #000;
  border-radius: .125rem;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: 0 .925em;
  position: relative;
  color: #fff;
  text-decoration: none;
  transition: transform .2s, color .2s, background .2s, box-shadow .2s;
  user-select: none;
  margin-top: 1rem;

  &:active {
    transform: scale(.95);
  }
`

export default withStore(PageLogin)
