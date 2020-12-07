import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

import Home from './pages/Home'
import Booking from './pages/Booking'
import BookingSeat from './pages/BookingSeat'
import Payment from './pages/Payment'

import './App.css'

const GET_TOKEN = gql`
  query Token {
    token
  }
`

function App() {
  const { data: { token } = {} } = useQuery<{ token: string }>(GET_TOKEN)

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
  }, [token])

  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path="/booking/:bizItemId" component={Booking} />
          <Route path="/booking-seat/:bizItemId/:slotMapId" component={BookingSeat} />
          <Route path="/payment/:bizItemId/:slotMapId" component={Payment} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
