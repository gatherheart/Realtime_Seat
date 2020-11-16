import React from 'react'
import { useHistory } from 'react-router-dom'

import Calendar from '../components/bookingSchedule/Calendar'
import TicketInfo from '../components/bookingSchedule/TicketInfo'
import Poster from '../components/performance/Poster'
import Content from '../components/performance/Content'
import PerformanceInfo from '../components/performance/PerformanceInfo'

export default function BookingSchedule(): JSX.Element {
  const history = useHistory()
  return (
    <div>
      <Poster />
      <Content />
      <Calendar />
      <TicketInfo />
      <PerformanceInfo />
      <div onClick={() => history.push('booking-seat')}>next</div>
    </div>
  )
}
