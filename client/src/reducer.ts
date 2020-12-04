import { createAction, handleActions } from 'redux-actions'

import { IState } from './interface'
import bookingNaver from './assets/booking-naver.png'

const initialState: IState = {
  name: '',
  desc: '',
  thumbnail: bookingNaver,
  extraDesc: [],
  address: {},
  performanceTimes: [],
  seats: [],
}

// Action Types
const SET_STATE = 'realtime-seat/SET_STATE'
const TOGGLE_SEAT = 'realtime-seat/TOGGLE_SEAT'
const OCCUPY_SEATS = 'realtime-seat/OCCUPY_SEATS'
const FREE_SEATS = 'realtime-seat/FREE_SEATS'

// Action Creators
export const actions = {
  setState: createAction<IState>(SET_STATE),
  toggleSeat: createAction<string>(TOGGLE_SEAT),
  occupySeats: createAction<string[]>(OCCUPY_SEATS),
  freeSeats: createAction<string[]>(FREE_SEATS),
}

type SetStateAction = ReturnType<typeof actions.setState>
type ToggleSeatAction = ReturnType<typeof actions.toggleSeat>
type OccupySeatAction = ReturnType<typeof actions.occupySeats>
type FreeSeatAction = ReturnType<typeof actions.freeSeats>

// Reducer
// eslint-disable-next-line
export default handleActions<IState, any>(
  {
    [SET_STATE]: (prevState, { payload }: SetStateAction) => ({
      ...prevState,
      ...payload,
    }),
    [TOGGLE_SEAT]: (prevState, { payload }: ToggleSeatAction) => {
      prevState.seats = prevState.seats.filter((sn) => !payload.includes(sn))
      return prevState
    },
    [OCCUPY_SEATS]: (prevState, { payload }: OccupySeatAction) => {
      for (const item of payload) !prevState.seats.includes(item) ? prevState.seats.push(item) : null
      return prevState
    },
  },
  initialState,
)
