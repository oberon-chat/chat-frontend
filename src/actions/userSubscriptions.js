import { map } from 'lodash'
import { joinRoomChannel } from './rooms'
import { getRoomChannel } from '../reducers/rooms'
import { getRooms } from '../reducers/userSubscriptions'

export const createSubscription = (slug) => (dispatch, getState) => {
  const channel = getRoomChannel(getState(), slug)

  return channel.push('room:subscription:create')
}

export const addUserSubscription = (subscription) => ({
  type: 'ADD_USER_SUBSCRIPTION',
  subscription: subscription
})

export const replaceUserSubscriptions = (subscriptions) => ({
  type: 'REPLACE_USER_SUBSCRIPTIONS',
  subscriptions: subscriptions
})

export const joinAllRoomChannels = () => (dispatch, getState) => {
  const rooms = getRooms(getState())
  const join = (room) => dispatch(joinRoomChannel(room.slug))

  return map(rooms, join)
}
