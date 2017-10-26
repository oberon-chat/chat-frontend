import { find, isEmpty, map, reject } from 'lodash'

const initialState = {}

export const roomSubscriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ROOM_SUBSCRIPTION':
      return {
        ...state,
        [action.key]: state[action.key].concat(action.subscription)
      }
    case 'REPLACE_ROOM_SUBSCRIPTION':
      const updated = map(state[action.key], (subscription) => (
        subscription.id === action.subscription.id ? action.subscription : subscription
      ))

      return {
        ...state,
        [action.key]: updated
      }
    case 'REMOVE_ROOM_SUBSCRIPTION':
      return {
        ...state,
        [action.key]: reject(state[action.key], (subscription) => subscription.id === action.subscription.id)
      }
    case 'REPLACE_ROOM_SUBSCRIPTIONS':
      return {
        ...state,
        [action.key]: action.subscriptions
      }
    default:
      return state
  }
}

export const getRoomSubscriptions = (state, key) => state.roomSubscriptions[key] || []
export const getUsers = (state, key) => map(getRoomSubscriptions(state, key), (subscription) => subscription.user)
export const getDirectMessageUser = (state, key, currentUser) => {
  const user = find(getUsers(state, key), (user) => user.id !== currentUser.id)

  return isEmpty(user) ? {} : user
}
export const getRoomUserIds = (state, key) => (
  map(getRoomSubscriptions(state, key), (item) => item.userId).sort()
)

export default roomSubscriptionsReducer
