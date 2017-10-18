import { filter, find, map } from 'lodash'

const initialState = []

export const userSubscriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER_SUBSCRIPTION':
      return state.concat(action.subscription)
    case 'REPLACE_USER_SUBSCRIPTIONS':
      return action.subscriptions
    default:
      return state
  }
}

export const getSubscriptions = (state) => state.userSubscriptions || []
export const getRooms = (state) => map(getSubscriptions(state), (subscription) => subscription.room)
export const getRoomsByType = (state, type) => filter(getRooms(state), (room) => room.type === type)
export const getIsSubscribed = (state, slug) => find(getSubscriptions(state), (subscription) => subscription.room.slug === slug)

export default userSubscriptionsReducer
