import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Container, makeStyles, Grid } from '@material-ui/core'

import Cart from '../components/bookingSeat/Cart'
import Seat from '../components/bookingSeat/Seat'
import SeatDetails from '../components/bookingSeat/SeatDetails'
import SeatMap from '../components/bookingSeat/SeatMap'

const useStyles = makeStyles((theme) => ({
  container: {
    borderColor: theme.palette.primary.main,
    borderWidth: 3,
    borderStyle: 'solid',
    minWidth: 320,
  },
}))

export default function BookingSeat() {
  const history = useHistory()
  const params = useParams<{ bizItemId: string; slotMapId: string }>()
  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container>
        <Grid item md={9} sm={9} xs={12}>
          <SeatMap />
          <Seat />
        </Grid>
        <Grid item md={3} sm={3} xs={12}>
          <SeatDetails {...params} />
          <Cart />
          <div onClick={() => history.push('payment')}>next</div>
        </Grid>
      </Grid>
    </Container>
  )
}
