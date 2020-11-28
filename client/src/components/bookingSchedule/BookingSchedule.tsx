import React from 'react'
import { Grid } from '@material-ui/core'

import Poster from '../performance/Poster'
import Content from '../performance/Content'
import ScheduleDetails from './ScheduleDetails'

export default function BookingSchedule() {
  return (
    <Grid container spacing={2}>
      <Grid item md={6} sm={6} xs={12}>
        <Poster />
        <Content />
      </Grid>
      <Grid item md={6} sm={6} xs={12}>
        <ScheduleDetails />
      </Grid>
    </Grid>
  )
}
