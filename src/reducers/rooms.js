import { getChannel } from './channels'

const initialState = {}

export const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ROOMS':
      return action.rooms
    default:
      return state
  }
}

export const getRooms = (state) => state.rooms || {}
export const getRoomsChannel = (state) => getChannel(state, 'rooms')
export const getRoomChannel = (state, key) => getChannel(state, 'room:' + key)

export default roomsReducer
