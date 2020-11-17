import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import Performance from '../components/performance/Performance'
import BookingSchedule from '../components/bookingSchedule/BookingSchedule'
import PerformanceInfo from '../components/performanceInfo/PerformanceInfo'

export default function Booking(): JSX.Element {
  const match = useRouteMatch()
  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={Performance} />
        <Route path={`${match.path}/:bookingId`} component={BookingSchedule} />
      </Switch>
      <PerformanceInfo />
    </div>
  )
}
