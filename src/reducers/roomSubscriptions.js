import { map } from 'lodash'

const initialState = {}

export const roomSubscriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ROOM_SUBSCRIPTION':
      return {
        ...state,
        [action.key]: state[action.key].concat(action.subscription)
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

export const getSubscriptions = (state, key) => state.roomSubscriptions[key] || []
export const getUsers = (state, key) => map(getSubscriptions(state, key), (subscription) => subscription.user)

export default roomSubscriptionsReducer
