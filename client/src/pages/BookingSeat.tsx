import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Container, makeStyles, Grid } from '@material-ui/core'

import Cart from '../components/bookingSeat/Cart'
import Seat from '../components/bookingSeat/Seat'
import SeatDetails from '../components/bookingSeat/SeatDetails'
import SeatMap from '../components/bookingSeat/SeatMap'

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: 320,
    backgroundColor: 'white',
  },
}))

export default function BookingSeat() {
  const history = useHistory()
  const params = useParams<{ bizItemId: string; slotMapId: string }>()
  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item md={9} sm={9} xs={12}>
          <SeatMap />
          <Seat />
          <SeatDetails {...params} />
        </Grid>
        <Grid item md={3} sm={3} xs={12}>
          <Cart />
          <div onClick={() => history.push(`/payment/${params.bizItemId}/${params.slotMapId}`)}>next</div>
        </Grid>
      </Grid>
    </Container>
  )
}
