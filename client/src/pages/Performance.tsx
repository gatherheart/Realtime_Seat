import React from 'react'
import { useHistory } from 'react-router-dom'

import Poster from '../components/performance/Poster'
import Content from '../components/performance/Content'
import PerformanceInfo from '../components/performance/PerformanceInfo'

export default function Performance(): JSX.Element {
  const history = useHistory()

  return (
    <div>
      <Poster />
      <Content />
      <PerformanceInfo />
      <div onClick={() => history.push('booking-schedule')}>next</div>
    </div>
  )
}
