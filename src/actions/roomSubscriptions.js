import { getRoomChannel } from '../reducers/rooms'

export const createRoomSubscription = (slug) => (dispatch, getState) => {
  const channel = getRoomChannel(getState(), slug)

  return channel.push('room:subscribe')
}

export const addRoomSubscription = (subscription) => ({
  type: 'ADD_ROOM_SUBSCRIPTION',
  subscription: subscription
})

export const replaceRoomSubscriptions = (subscriptions) => ({
  type: 'REPLACE_ROOM_SUBSCRIPTIONS',
  subscriptions: subscriptions
})
