import { getRoomChannel } from '../reducers/rooms'

export const addUserSubscription = (subscription) => ({
  type: 'ADD_USER_SUBSCRIPTION',
  subscription: subscription
})

export const replaceUserSubscriptions = (subscriptions) => ({
  type: 'REPLACE_USER_SUBSCRIPTIONS',
  subscriptions: subscriptions
})
