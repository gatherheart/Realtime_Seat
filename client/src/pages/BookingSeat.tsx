import React from 'react'
import { useHistory } from 'react-router-dom'

import Cart from '../components/bookingSeat/Cart'
import Seat from '../components/bookingSeat/Seat'
import SeatInfo from '../components/bookingSeat/SeatInfo'
import SeatMap from '../components/bookingSeat/SeatMap'
import PerformanceInfo from '../components/performance/PerformanceInfo'

export default function BookingSeat(): JSX.Element {
  const history = useHistory()
  return (
    <div>
      <SeatMap />
      <Seat />
      <SeatInfo />
      <Cart />
      <PerformanceInfo />
      <div onClick={() => history.push('payment')}>next</div>
    </div>
  )
}
