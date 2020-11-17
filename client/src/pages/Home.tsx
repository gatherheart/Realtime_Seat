import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Home(): JSX.Element {
  const history = useHistory()
  return <div onClick={() => history.push('booking')}>select performance</div>
}
