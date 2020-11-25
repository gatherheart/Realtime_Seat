import React from 'react'
import { Container, Grid } from '@material-ui/core'

import Poster from '../components/performance/Poster'
import Content from '../components/performance/Content'
import Cart from '../components/bookingSeat/Cart'
import UserDetails from '../components/payment/UserDetails'

export default function Payment() {
  return (
    <Container>
      <Grid container>
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
