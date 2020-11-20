import React from 'react'
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'

import Details from './Details'
import Location from './Location'

export default function PerformanceDetails() {
  return (
    <div>
      <MemoryRouter>
        <AppBar position="static">
          <Link to="/">상세정보</Link>
          <Link to="/location">오시는 길</Link>
        </AppBar>
        <Switch>
          <Route exact path="/" component={Details} />
          <Route path="/location" component={Location} />
        </Switch>
      </MemoryRouter>
    </div>
  )
}
