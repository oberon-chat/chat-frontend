export const addRoomSubscription = (key, subscription) => ({
  type: 'ADD_ROOM_SUBSCRIPTION',
  key: key,
  subscription: subscription
})

export const replaceRoomSubscriptions = (key, subscriptions) => ({
  type: 'REPLACE_ROOM_SUBSCRIPTIONS',
  key: key,
  subscriptions: subscriptions
})
