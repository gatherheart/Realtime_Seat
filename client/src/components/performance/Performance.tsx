import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import Poster from './Poster'
import Content from './Content'

export default function Performance(): JSX.Element {
  const history = useHistory()
  const match = useRouteMatch()

  return (
    <div>
      <Poster />
      <Content />
      <div onClick={() => history.push(`${match.url}/schedule`)}>next</div>
    </div>
  )
}
