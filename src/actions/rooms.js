import { Presence } from 'phoenix'
import { reverse } from 'lodash'
import { joinChannel } from './channels'
import { addMessage, removeMessage, replaceMessage, replaceMessages } from './roomMessages'
import { addRoomSubscription, replaceRoomSubscriptions } from './roomSubscriptions'
import { updateRoomUsers } from './roomUsers'
import { getRooms, getRoomsChannel } from '../reducers/rooms'
import { getRoomUsers } from '../reducers/roomUsers'
import { camelize } from '../helpers/data'

export const createRoom = (roomName) => (dispatch, getState) => {
  const channel = getRoomsChannel(getState())

  return channel.push('rooms:create', {name: roomName})
}

export const viewRoom = (roomName) => ({
  type: 'VIEW_ROOM',
  room: roomName
})

const updateRooms = (rooms) => ({
  type: 'UPDATE_ROOMS',
  rooms: rooms
})

export const joinRooms = (onSuccess, onError) => (dispatch, getState) => {
  const key = 'rooms'
  const channelCallbacks = (channel) => {
    channel.on('rooms:state', (data) => {
      const current = getRooms(getState())
      const updated = Presence.syncState(current, data)

      dispatch(updateRooms(updated))
    })

    channel.on('rooms:diff', (data) => {
      const current = getRooms(getState())
      const updated = Presence.syncDiff(current, data)

      dispatch(updateRooms(updated))
    })

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

export const joinRoom = (roomName, onSuccess, onError) => (dispatch, getState) => {
  const key = 'room:' + roomName
  const channelCallbacks = (channel) => {
    channel.on('users:state', (data) => {
      const current = getRoomUsers(getState(), roomName)
      const users = Presence.syncState(current, data)

      dispatch(updateRoomUsers(roomName, users))
    })

    channel.on('users:diff', (data) => {
      const current = getRoomUsers(getState(), roomName)
      const users = Presence.syncDiff(current, data)

      dispatch(updateRoomUsers(roomName, users))
    })

    channel.on('room:subscribed', (data) => {
      dispatch(addRoomSubscription(camelize(data)))
    })

    channel.on('messages:list', (data) => {
      const messages = camelize(reverse((data || {}).messages))

      dispatch(replaceMessages(roomName, messages))
    })

    channel.on('message:created', (data) => (
      dispatch(addMessage(roomName, camelize(data)))
    ))

    channel.on('message:updated', (data) => (
      dispatch(replaceMessage(roomName, camelize(data)))
    ))

    channel.on('message:deleted', (data) => (
      dispatch(removeMessage(roomName, camelize(data)))
    ))

    return channel
  }

  return joinChannel(dispatch, getState, key, channelCallbacks, onSuccess, onError)
}
