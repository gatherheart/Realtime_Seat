import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Details(): JSX.Element {
  const history = useHistory()
  return (
    <div>
      Details
      <div onClick={() => history.push('/location')}>switch</div>
    </div>
  )
}
