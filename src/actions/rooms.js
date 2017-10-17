import { Presence } from 'phoenix'
import { reverse } from 'lodash'
import { joinChannel } from './channels'
import { addMessage, removeMessage, replaceMessage, replaceMessages } from './roomMessages'
import { addRoomSubscription, replaceRoomSubscriptions } from './roomSubscriptions'
import { updateRoomUsers } from './roomUsers'
import { getRooms, getRoomsChannel } from '../reducers/rooms'
import { getRoomUsers } from '../reducers/roomUsers'
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

const updateRooms = (rooms) => ({
  type: 'UPDATE_ROOMS',
  rooms: rooms
})

export const joinRooms = (onSuccess, onError) => (dispatch, getState) => {
  const key = 'rooms'
  const channelCallbacks = (channel) => {
    channel.on('room:subscriptions', (data) => {
      dispatch(replaceRoomSubscriptions(camelize(data.subscriptions)))
    })

    channel.on('room:subscribed', (data) => {
      dispatch(addRoomSubscription(camelize(data)))
    })

    return channel
  }

  return joinChannel(dispatch, getState, key, channelCallbacks, onSuccess, onError)
}

export const joinRoom = (slug, onSuccess, onError) => (dispatch, getState) => {
  const key = 'room:' + slug
  const channelCallbacks = (channel) => {
    channel.on('users:state', (data) => {
      const current = getRoomUsers(getState(), slug)
      const users = Presence.syncState(current, data)

      dispatch(updateRoomUsers(slug, users))
    })

    channel.on('users:diff', (data) => {
      const current = getRoomUsers(getState(), slug)
      const users = Presence.syncDiff(current, data)

      dispatch(updateRoomUsers(slug, users))
    })

    channel.on('room:subscribed', (data) => {
      dispatch(addRoomSubscription(camelize(data)))
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

export const joinSupportRooms = (onSuccess, onError) => (dispatch, getState) => {
  const key = 'support_rooms'
  const channelCallbacks = (channel) => {
    channel.on('support_rooms:state', (data) => {
      const current = getRooms(getState())
      const updated = Presence.syncState(current, data)

      dispatch(updateRooms(updated))
    })

    channel.on('support_rooms:diff', (data) => {
      const current = getRooms(getState())
      const updated = Presence.syncDiff(current, data)

      dispatch(updateRooms(updated))
    })

    return channel
  }

  return joinChannel(dispatch, getState, key, channelCallbacks, onSuccess, onError)
}
