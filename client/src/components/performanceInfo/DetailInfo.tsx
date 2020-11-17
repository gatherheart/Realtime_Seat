import React from 'react'
import { useHistory } from 'react-router-dom'

export default function DetailInfo(): JSX.Element {
  const history = useHistory()
  return (
    <div>
      DetailInfo
      <div onClick={() => history.push('/location')}>switch</div>
    </div>
  )
}
