import { createAction, handleActions } from 'redux-actions'

import { IState } from './interface'
import bookingNaver from './assets/booking-naver.png'

const initialState: IState = {
  id: '',
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

// Action Creators
export const actions = {
  setState: createAction<IState>(SET_STATE),
}

type setStateAction = ReturnType<typeof actions.setState>

// Reducer
export default handleActions<IState, setStateAction>(
  {
    [SET_STATE]: (prevState, action) => ({
      ...prevState,
      ...action.payload,
    }),
  },
  initialState,
)
