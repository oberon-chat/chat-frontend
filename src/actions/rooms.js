import { reverse } from 'lodash'
import { joinChannel } from './channels'
import { addMessage, removeMessage, replaceMessage, replaceMessages } from './roomMessages'
import { addRoomSubscription, replaceRoomSubscriptions } from './roomSubscriptions'
import { addUserSubscription, joinAllRoomChannels, replaceUserSubscriptions } from './userSubscriptions'
import { getRoomsChannel } from '../reducers/rooms'
import { camelize } from '../helpers/data'

export const createRoom = (name, type, onSuccess, onError) => (dispatch, getState) => {
  const channel = getRoomsChannel(getState())

  return channel
    .push('rooms:create', {name: name, type: type})
    .receive('ok', (response) => onSuccess && onSuccess(response))
    .receive('error', (response) => onError && onError(response))
}

export const viewRoom = (slug) => ({
  type: 'VIEW_ROOM',
  room: slug
})

export const joinRoomsChannel = (onSuccess, onError) => (dispatch, getState) => {
  const key = 'rooms'
  const channelCallbacks = (channel) => {
    channel.on('user:subscriptions', (data) => {
      dispatch(replaceUserSubscriptions(camelize(data.subscriptions)))
      dispatch(joinAllRoomChannels())
    })

    channel.on('user:subscription:created', (data) => {
      dispatch(addUserSubscription(camelize(data)))
      dispatch(joinAllRoomChannels())
    })

    return channel
  }

  return joinChannel(dispatch, getState, key, channelCallbacks, onSuccess, onError)
}

export const joinRoomChannel = (slug, onSuccess, onError) => (dispatch, getState) => {
  const key = 'room:' + slug
  const channelCallbacks = (channel) => {
    channel.on('room:subscriptions', (data) => {
      dispatch(replaceRoomSubscriptions(slug, camelize(data.subscriptions)))
    })

    channel.on('room:subscription:created', (data) => {
      dispatch(addRoomSubscription(slug, camelize(data)))
    })

    channel.on('user:subscription:created', (data) => {
      dispatch(addUserSubscription(camelize(data)))
      dispatch(joinAllRoomChannels())
    })

    channel.on('messages:list', (data) => {
      const messages = camelize(reverse((data || {}).messages))

      dispatch(replaceMessages(slug, messages))
    })

    channel.on('message:created', (data) => (
      dispatch(addMessage(slug, camelize(data)))
    ))

    channel.on('message:updated', (data) => (
      dispatch(replaceMessage(slug, camelize(data)))
    ))

    channel.on('message:deleted', (data) => (
      dispatch(removeMessage(slug, camelize(data)))
    ))

    return channel
  }

  return joinChannel(dispatch, getState, key, channelCallbacks, onSuccess, onError)
}
