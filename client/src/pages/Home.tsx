import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Home() {
  const history = useHistory()
  const id = 123
  return <div onClick={() => history.push(`booking/${id}`)}>select performance</div>
}
