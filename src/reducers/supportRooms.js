import { map } from 'lodash'
import { metas } from '../helpers/presence'

const initialState = {}

export const supportRoomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SUPPORT_ROOMS':
      return action.rooms
    default:
      return state
  }
}

export const getSupportRoomsPresence = (state) => state.supportRooms
export const getSupportRooms = (state) => (
  map(state.supportRooms, (room) => metas(room))
)
export const getSupportRoom = (state, key) => {
  const presence = state.supportRooms
  const room = presence[key]

  return room ? metas(room) : {}
}

export default supportRoomsReducer
