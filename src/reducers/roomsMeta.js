import { find, first, reduce } from 'lodash'

const initialState = {}

export const roomsMetaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VIEW_ROOM':
      const withCurrentRoom = state[action.room] ? state : { ...state, [action.room]: {} }

      return reduce(withCurrentRoom, (acc, value, room) => {
        if (room === action.room) {
          acc[room] = { ...value, viewing: true }
        } else if (value.viewing) {
          acc[room] = { ...value, viewing: false }
        } else {
          acc[room] = value
        }

        return acc
      }, {})
    default:
      return state
  }
}

export const getRoomsMeta = (state) => state.roomsMeta || {}
export const getRoomMeta = (state, slug) => getRoomsMeta(state)[slug] || {}
export const getActive = (state) => {
  const rooms = getRoomsMeta(state)
  const found = find(rooms, (room) => room.viewing)
  const fallback = first(rooms) || {}

  return found || fallback
}

export default roomsMetaReducer
