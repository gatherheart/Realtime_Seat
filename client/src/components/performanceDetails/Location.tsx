import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Location(): JSX.Element {
  const history = useHistory()
  return (
    <div>
      Location
      <div onClick={() => history.push('/')}>switch</div>
    </div>
  )
}
