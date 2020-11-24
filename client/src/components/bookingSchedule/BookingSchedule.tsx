import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'

import Poster from '../performance/Poster'
import Content from '../performance/Content'
import ScheduleDetails from './ScheduleDetails'

export default function BookingSchedule() {
  const history = useHistory()
  return (
    <Grid container>
      <Grid item md={6} sm={6} xs={12}>
        <Poster />
        <Content />
      </Grid>
      <Grid item md={6} sm={6} xs={12}>
        <ScheduleDetails />
        <Button variant="contained" color="primary" onClick={() => history.push('/booking-seat')}>
          다음단계
        </Button>
      </Grid>
    </Grid>
  )
}
