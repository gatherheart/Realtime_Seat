import { createAction, handleActions } from 'redux-actions'

export interface PerformanceData {
  name: string
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
    name: '그날들',
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
