import { clone, find, head, map, reject, reverse } from 'lodash'
import moment from 'moment'

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
export const getLastRoomMessage = (state, slug) => head(reverse(clone(state.roomMessages[slug]))) || {}
export const getUsersLastRoomMessage = (state, slug, user) => (
  find(reverse(clone(state.roomMessages[slug])), (message) => message.user.id === user.id) || {}
)
export const getRoomMessagesAfter = (state, slug, timestamp) => {
  const messages = getRoomMessages(state, slug)

  let i, result = []

  for (i = messages.length - 1; i > 0; i--) {
    const message = messages[i]
    const insertedAt = moment(message.insertedAt).unix()

    if (insertedAt > timestamp) {
      result.push(message)
    } else {
      break
    }
  }

  return result
}

export default roomMessagesReducer
