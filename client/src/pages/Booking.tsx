import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import Performance from '../components/performance/Performance'
import BookingSchedule from '../components/bookingSchedule/BookingSchedule'
import PerformanceDetails from '../components/performanceDetails/PerformanceDetails'

const useStyles = makeStyles((theme) => ({
  container: {
    borderColor: theme.palette.primary.main,
    borderWidth: 3,
    borderStyle: 'solid',
    minWidth: 320,
  },
}))

export default function Booking() {
  const match = useRouteMatch()
  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.container}>
      <Switch>
        <Route exact path={match.path} component={Performance} />
        <Route path={`${match.path}/:bookingId`} component={BookingSchedule} />
      </Switch>
      <PerformanceDetails />
    </Container>
  )
}
