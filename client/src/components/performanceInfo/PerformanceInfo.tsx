import React from 'react'
import { MemoryRouter, Switch, Route } from 'react-router-dom'

import DetailInfo from './DetailInfo'
import Location from './Location'

export default function PerformanceInfo(): JSX.Element {
  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/" component={DetailInfo} />
        <Route path="/location" component={Location} />
      </Switch>
    </MemoryRouter>
  )
}
