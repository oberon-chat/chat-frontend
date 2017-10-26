export const addRoomSubscription = (key, subscription) => ({
  type: 'ADD_ROOM_SUBSCRIPTION',
  key: key,
  subscription: subscription
})

export const replaceRoomSubscription = (key, subscription) => ({
  type: 'REPLACE_ROOM_SUBSCRIPTION',
  key: key,
  subscription: subscription
})

export const removeRoomSubscription = (key, subscription) => ({
  type: 'REMOVE_ROOM_SUBSCRIPTION',
  key: key,
  subscription: subscription
})

export const replaceRoomSubscriptions = (key, subscriptions) => ({
  type: 'REPLACE_ROOM_SUBSCRIPTIONS',
  key: key,
  subscriptions: subscriptions
})
