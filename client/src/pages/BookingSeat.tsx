import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Container, makeStyles, Grid, Button } from '@material-ui/core'

import SeatDetails from '../components/bookingSeat/SeatDetails'
import SeatMap from '../components/bookingSeat/SeatMap'

const useStyles = makeStyles(() => ({
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
          <SeatDetails {...params} />
        </Grid>
        <Grid item md={3} sm={3} xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/payment/${params.bizItemId}/${params.slotMapId}`)}
          >
            다음단계
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
