import React from 'react'
import { useHistory } from 'react-router'

import UserDetails from '../components/payment/UserDetails'

export default function Payment(): JSX.Element {
  const history = useHistory()
  return (
    <div>
      <UserDetails />
      <div onClick={() => history.push('/')}>결제</div>
    </div>
  )
}
