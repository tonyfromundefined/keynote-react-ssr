import axios from 'axios'
import { NextPage } from 'next'
import React, { useState } from 'react'
import styled from 'styled-components'
import { withStore } from '~/store'

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
      <div>
        아이디
        <input
          type='text'
          value={username}
          onChange={onUsernameChange}
        />
      </div>
      <div>
        비밀번호
        <input
          type='password'
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <div>
        <button onClick={onLoginButtonClick}>로그인</button>
      </div>
    </Container>
  )
}

const Container = styled.div``

export default withStore(PageLogin)
