import { Presence } from 'phoenix'
import { map, reverse } from 'lodash'
import { camelizeKeys } from 'humps'
import { joinChannel } from './channels'
import { addMessage, removeMessage, replaceMessage, replaceMessages } from './roomMessages'
import { updateRoomUsers } from './roomUsers'
import { getRooms, getRoomsChannel } from '../reducers/rooms'
import { getRoomUsers } from '../reducers/roomUsers'

export const createRoom = (roomName) => (dispatch, getState) => {
  const rooms = getRoomsChannel(getState())

  return rooms.push('rooms:create', roomName)
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
    channel.on('presence_state', (data) => {
      const current = getRooms(getState())
      const updated = Presence.syncState(current, data)

      dispatch(updateRooms(updated))
    })

    channel.on('presence_diff', (data) => {
      const current = getRooms(getState())
      const updated = Presence.syncDiff(current, data)

      dispatch(updateRooms(updated))
    })

    return channel
  }

  return joinChannel(dispatch, getState, key, channelCallbacks, onSuccess, onError)
}

export const joinRoom = (roomName, onSuccess, onError) => (dispatch, getState) => {
  const key = 'room:' + roomName
  const channelCallbacks = (channel) => {
    channel.on('presence_state', (data) => {
      const current = getRoomUsers(getState(), roomName)
      const users = Presence.syncState(current, data)

      dispatch(updateRoomUsers(roomName, users))
    })

    channel.on('presence_diff', (data) => {
      const current = getRoomUsers(getState(), roomName)
      const users = Presence.syncDiff(current, data)

      dispatch(updateRoomUsers(roomName, users))
    })

    channel.on('message_state', (data) => {
      const messages = reverse((data || {}).messages)
      const cased = map(messages, (message) => camelizeKeys(message, {}))

      dispatch(replaceMessages(roomName, cased))
    })

    channel.on('message:created', (data) => (
      dispatch(addMessage(roomName, camelizeKeys(data, {})))
    ))

    channel.on('message:updated', (data) => (
      dispatch(replaceMessage(roomName, camelizeKeys(data, {})))
    ))

    channel.on('message:deleted', (data) => (
      dispatch(removeMessage(roomName, camelizeKeys(data, {})))
    ))

    return channel
  }

  return joinChannel(dispatch, getState, key, channelCallbacks, onSuccess, onError)
}
