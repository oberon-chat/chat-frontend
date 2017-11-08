import { filter, find, map, reject, reduce } from 'lodash'

const initialState = []

export const userSubscriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER_SUBSCRIPTION':
      return state.concat(action.subscription)
    case 'REPLACE_USER_SUBSCRIPTION':
      return map(state, (subscription) => (
        subscription.id === action.subscription.id ? action.subscription : subscription
      ))
    case 'REMOVE_USER_SUBSCRIPTION':
      return reject(state, (subscription) => subscription.id === action.subscription.id)
    case 'REPLACE_USER_SUBSCRIPTIONS':
      return action.subscriptions
    default:
      return state
  }
}

export const getSubscriptions = (state) => state.userSubscriptions || []
export const getSubscription = (state, slug) => find(getSubscriptions(state), (subscription) => subscription.room.slug === slug) || {}
export const getViewedAt = (state, slug) => getSubscription(state, slug).viewedAt
export const getRooms = (state) => map(getSubscriptions(state), (subscription) => subscription.room)
export const getRoom = (state, slug) => find(getRooms(state), (room) => room.slug === slug) || {}
export const getRoomsByType = (state, type) => filter(getRooms(state), (room) => room.type === type)
export const getOpenRooms = (state) => (
  reduce(getSubscriptions(state), (acc, subscription) => {
    if (subscription.state === 'open') {
      acc = acc.concat(subscription.room)
    }

    return acc
  }, [])
)
export const getOpenRoomsByType = (state, type) => filter(getOpenRooms(state), (room) => room.type === type)
export const getIsSubscribed = (state, slug) => find(getSubscriptions(state), (subscription) => subscription.room.slug === slug)

export default userSubscriptionsReducer
