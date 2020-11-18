import { createAction, handleActions } from 'redux-actions'

import bookingNaver from './assets/booking-naver.png'

export interface PerformanceData {
  id: number
  name: string
  startDate: Date
  endDate: Date
  address: string
  thumbnail: string
  details: string
  location: string
}

export interface Seat {
  x: number
  y: number
  isOccupied: boolean
}

export interface State {
  data: PerformanceData
  seats: Seat[]
}

const initialState: State = {
  data: {
    id: 123,
    name: '뮤지컬<그날들>',
    startDate: new Date('2020.11.13'),
    endDate: new Date('2020.02.07'),
    address: '충무아트센터 대극장',
    thumbnail: bookingNaver,
    details: '상세 정보',
    location: '오시는 길',
  },
  seats: [],
}

// Action Types
const SET_STATE = 'realtime-seat/SET_STATE'

// Action Creators
export const actions = {
  setState: createAction<PerformanceData | Seat>(SET_STATE),
}

type setStateAction = ReturnType<typeof actions.setState>

// Reducer
export default handleActions<State, setStateAction>(
  {
    [SET_STATE]: (prevState, action) => ({
      ...prevState,
      ...action.payload,
    }),
  },
  initialState,
)
