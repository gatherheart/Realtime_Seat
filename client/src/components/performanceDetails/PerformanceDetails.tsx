import React from 'react'
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom'
import { AppBar, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Details from './Details'
import Location from './Location'

const useStyle = makeStyles(() => ({
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  grid: {
    padding: '0.75rem',
  },
}))

export default function PerformanceDetails() {
  const classes = useStyle()

  return (
    <div>
      <MemoryRouter>
        <AppBar position="static">
          <Grid container>
            <Grid item className={classes.grid} sm={2} xs={6}>
              <Link className={classes.link} to="/">
                상세정보
              </Link>
            </Grid>
            <Grid item className={classes.grid} sm={2} xs={6}>
              <Link className={classes.link} to="/location">
                오시는 길
              </Link>
            </Grid>
          </Grid>
        </AppBar>
        <Switch>
          <Route exact path="/" component={Details} />
          <Route path="/location" component={Location} />
        </Switch>
      </MemoryRouter>
    </div>
  )
}
