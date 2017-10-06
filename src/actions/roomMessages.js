import { getRoomChannel } from '../reducers/rooms'
import { getRoomMessage } from '../reducers/roomMessages'

export const addMessage = (roomName, message) => ({
  type: 'ADD_ROOM_MESSAGE',
  key: roomName,
  message: message
})

export const replaceMessage = (roomName, message) => ({
  type: 'REPLACE_ROOM_MESSAGE',
  key: roomName,
  message: message
})

export const replaceMessages = (roomName, messages) => ({
  type: 'REPLACE_ROOM_MESSAGES',
  key: roomName,
  messages: messages
})

export const removeMessage = (roomName, message) => ({
  type: 'REMOVE_ROOM_MESSAGE',
  key: roomName,
  message: message
})

export const submitMessage = (roomName, message) => (dispatch, getState) => {
  const room = getRoomChannel(getState(), roomName)

  return room.push('message:create', { body: message })
}

export const editMessage = (roomName, messageId, body) => (dispatch, getState) => {
  const state = getState()
  const room = getRoomChannel(state, roomName)
  const message = getRoomMessage(state, roomName, messageId)
  const updatedMessage = {
    ...message,
    body: body
  }

  return room.push('message:update', updatedMessage)
}

export const deleteMessage = (roomName, messageId) => (dispatch, getState) => {
  const state = getState()
  const room = getRoomChannel(state, roomName)
  const message = getRoomMessage(state, roomName, messageId)

  return room.push('message:delete', message)
}
