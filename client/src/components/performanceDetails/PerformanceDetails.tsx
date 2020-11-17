import React from 'react'
import { MemoryRouter, Switch, Route } from 'react-router-dom'

import Details from './Details'
import Location from './Location'

export default function PerformanceDetails(): JSX.Element {
  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/" component={Details} />
        <Route path="/location" component={Location} />
      </Switch>
    </MemoryRouter>
  )
}
