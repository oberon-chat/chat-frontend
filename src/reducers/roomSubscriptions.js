import { filter, find, map } from 'lodash'

const initialState = []

export const roomSubscriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ROOM_SUBSCRIPTION':
      return state.concat(action.subscription)
    case 'REPLACE_ROOM_SUBSCRIPTIONS':
      return action.subscriptions
    default:
      return state
  }
}

export const getSubscriptions = (state) => state.roomSubscriptions || []
export const getRooms = (state) => map(getSubscriptions(state), (subscription) => subscription.room)
export const getRoomsByType = (state, type) => filter(getRooms(state), (room) => room.type === type)
export const getIsSubscribed = (state, slug) => find(getSubscriptions(state), (subscription) => subscription.room.slug === slug)

export default roomSubscriptionsReducer
