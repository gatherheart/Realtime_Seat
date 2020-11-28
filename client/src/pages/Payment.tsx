import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Poster from '../components/performance/Poster'
import Content from '../components/performance/Content'
import Cart from '../components/bookingSeat/Cart'
import UserDetails from '../components/payment/UserDetails'

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: 320,
    backgroundColor: 'white',
  },
}))

export default function Payment() {
  const classes = useStyles()
  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item md={6} sm={6} xs={12}>
          <Poster />
          <Content />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Cart />
          <UserDetails />
        </Grid>
      </Grid>
    </Container>
  )
}
