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
  seats: new Set<string>(),
}

// Action Types
const SET_STATE = 'realtime-seat/SET_STATE'
const TOGGLE_SEAT = 'realtime-seat/TOGGLE_SEAT'
const TOGGLE_SEATS = 'realtime-seat/TOGGLE_SEATS'

// Action Creators
export const actions = {
  setState: createAction<IState>(SET_STATE),
  toggleSeat: createAction<string>(TOGGLE_SEAT),
  toggleSeats: createAction<string[]>(TOGGLE_SEATS),
}

type SetStateAction = ReturnType<typeof actions.setState>
type ToggleSeatAction = ReturnType<typeof actions.toggleSeat>
type ToggleSeatsAction = ReturnType<typeof actions.toggleSeats>

// Reducer
// eslint-disable-next-line
export default handleActions<IState, any>(
  {
    [SET_STATE]: (prevState, { payload }: SetStateAction) => ({
      ...prevState,
      ...payload,
    }),
    [TOGGLE_SEAT]: (prevState, { payload }: ToggleSeatAction) => {
      prevState.seats?.has(payload) ? prevState.seats?.delete(payload) : prevState.seats?.add(payload)
      return prevState
    },
    [TOGGLE_SEATS]: (prevState, { payload }: ToggleSeatsAction) => {
      for (const item of payload) {
        prevState.seats?.has(item) ? prevState.seats?.delete(item) : prevState.seats?.add(item)
      }
      return prevState
    },
  },
  initialState,
)
