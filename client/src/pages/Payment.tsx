import React from 'react'
import { useHistory } from 'react-router'

import UserInfo from '../components/payment/UserInfo'

export default function Payment(): JSX.Element {
  const history = useHistory()
  return (
    <div>
      <UserInfo />
      <div onClick={() => history.push('/')}>결제</div>
    </div>
  )
}
