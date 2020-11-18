import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Home() {
  const history = useHistory()
  return <div onClick={() => history.push('booking')}>select performance</div>
}
