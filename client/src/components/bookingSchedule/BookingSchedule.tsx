import React from 'react'
import { useHistory } from 'react-router-dom'

import Poster from '../performance/Poster'
import Content from '../performance/Content'
import Calendar from './Calendar'
import TicketInfo from './TicketInfo'

export default function BookingSchedule(): JSX.Element {
  const history = useHistory()
  return (
    <div>
      <Poster />
      <Content />
      <Calendar />
      <TicketInfo />
      <div onClick={() => history.push('/booking-seat')}>next</div>
    </div>
  )
}
