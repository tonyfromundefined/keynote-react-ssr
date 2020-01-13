import React from 'react'
import { NextPage } from 'next'
import { withStore } from '../store'

const PageIndex: NextPage = () => {
  return (
    <div>Hello, World</div>
  )
}

export default withStore(PageIndex)
