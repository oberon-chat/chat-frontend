import { map } from 'lodash'
import { joinRoomChannel } from './rooms'
import { getRoomChannel } from '../reducers/rooms'
import { getRooms } from '../reducers/userSubscriptions'

export const createSubscription = (slug, onSuccess, onError) => (dispatch, getState) => {
  const channel = getRoomChannel(getState(), slug)

  return channel
    .push('room:subscription:create')
    .receive('ok', (response) => onSuccess && onSuccess(response))
    .receive('error', (response) => onError && onError(response))
}

export const updateSubscription = (slug, values, onSuccess, onError) => (dispatch, getState) => {
  const channel = getRoomChannel(getState(), slug)

  return channel
    .push('room:subscription:update', values)
    .receive('ok', (response) => onSuccess && onSuccess(response))
    .receive('error', (response) => onError && onError(response))
}

export const deleteSubscription = (slug, onSuccess, onError) => (dispatch, getState) => {
  const channel = getRoomChannel(getState(), slug)

  return channel
    .push('room:subscription:delete')
    .receive('ok', (response) => onSuccess && onSuccess(response))
    .receive('error', (response) => onError && onError(response))
}

export const addUserSubscription = (subscription) => ({
  type: 'ADD_USER_SUBSCRIPTION',
  subscription: subscription
})

export const replaceUserSubscription = (subscription) => ({
  type: 'REPLACE_USER_SUBSCRIPTION',
  subscription: subscription
})

export const replaceUserSubscriptions = (subscriptions) => ({
  type: 'REPLACE_USER_SUBSCRIPTIONS',
  subscriptions: subscriptions
})

export const removeUserSubscription = (subscription) => ({
  type: 'REMOVE_USER_SUBSCRIPTION',
  subscription: subscription
})

export const joinAllRoomChannels = () => (dispatch, getState) => {
  const rooms = getRooms(getState())
  const join = (room) => dispatch(joinRoomChannel(room.slug))

  return map(rooms, join)
}
