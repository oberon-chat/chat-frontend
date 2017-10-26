import { clone, find, map, reject, reverse } from 'lodash'

const initialState = {}

export const roomMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ROOM_MESSAGE':
      const current = state[action.key] || []
      const next = find(current, (message) => message.id === action.message.id)
        ? current
        : current.concat(action.message)

      return {
        ...state,
        [action.key]: next
      }
    case 'REPLACE_ROOM_MESSAGES':
      return {
        ...state,
        [action.key]: action.messages || []
      }
    case 'REPLACE_ROOM_MESSAGE':
      const updated = map(state[action.key], (message) => (
        message.id === action.message.id ? action.message : message
      ))

      return {
        ...state,
        [action.key]: updated
      }
    case 'REMOVE_ROOM_MESSAGE':
      return {
        ...state,
        [action.key]: reject(state[action.key], (message) => message.id === action.message.id)
      }
    default:
      return state
  }
}

export const getRoomMessages = (state, slug) => state.roomMessages[slug] || []
export const getRoomMessage = (state, slug, id) => (
  find(state.roomMessages[slug], (message) => message.id === id) || {}
)
export const getLastRoomMessage = (state, slug, user) => (
  find(reverse(clone(state.roomMessages[slug])), (message) => message.user.id === user.id) || {}
)

export default roomMessagesReducer
