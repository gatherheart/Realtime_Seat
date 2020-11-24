import { createAction, handleActions } from 'redux-actions'

import { IState, ISlot } from './interface'
import bookingNaver from './assets/booking-naver.png'

const initialState: IState = {
  name: '',
  desc: '',
  thumbnail: bookingNaver,
  extraDesc: [],
  address: {},
  performanceTimes: [],
  seats: {},
}

// Action Types
const SET_STATE = 'realtime-seat/SET_STATE'
const ADD_SEAT = 'realtime-seat/PUSH_SEAT'
const REMOVE_SEAT = 'realtime-seat/REMOVE_SEAT'

// Action Creators
export const actions = {
  setState: createAction<IState>(SET_STATE),
  addSeat: createAction<ISlot>(ADD_SEAT),
  removeSeat: createAction<string>(REMOVE_SEAT),
}

type SetStateAction = ReturnType<typeof actions.setState>
type AddSeatAction = ReturnType<typeof actions.addSeat>
type RemoveSeatAction = ReturnType<typeof actions.removeSeat>

// Reducer
// eslint-disable-next-line
export default handleActions<IState, any>(
  {
    [SET_STATE]: (prevState, { payload }: SetStateAction) => ({
      ...prevState,
      ...payload,
    }),
    [ADD_SEAT]: (prevState, { payload }: AddSeatAction) => ({
      ...prevState,
      seats: {
        ...prevState.seats,
        [payload.number]: payload,
      },
    }),
    [REMOVE_SEAT]: (prevState, { payload }: RemoveSeatAction) => {
      delete prevState.seats?.[payload]
      return prevState
    },
  },
  initialState,
)
