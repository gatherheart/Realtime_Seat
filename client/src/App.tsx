import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Performance from './pages/Performance'
import BookingSchedule from './pages/BookingSchedule'
import BookingSeat from './pages/BookingSeat'
import Payment from './pages/Payment'

import './App.css'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Performance} />
        <Switch>
          <Route path="/booking-schedule" component={BookingSchedule} />
          <Route path="/booking-seat" component={BookingSeat} />
          <Route path="/payment" component={Payment} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
