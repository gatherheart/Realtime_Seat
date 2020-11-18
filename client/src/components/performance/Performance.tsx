import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'

import Poster from './Poster'
import Content from './Content'

export default function Performance() {
  const history = useHistory()
  const match = useRouteMatch()

  return (
    <Grid container>
      <Grid item md={6} sm={6} xs={12}>
        <Poster />
      </Grid>
      <Grid item md={6} sm={6} xs={12}>
        <Content />
        <Button variant="contained" color="primary" onClick={() => history.push(`${match.url}/schedule`)}>
          예매하기
        </Button>
      </Grid>
    </Grid>
  )
}
