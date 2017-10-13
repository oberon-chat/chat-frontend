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
  const channel = getRoomChannel(getState(), roomName)

  return channel.push('message:create', { body: message })
}

export const editMessage = (roomName, messageId, body) => (dispatch, getState) => {
  const state = getState()
  const channel = getRoomChannel(state, roomName)
  const message = getRoomMessage(state, roomName, messageId)
  const updatedMessage = {
    ...message,
    body: body
  }

  return channel.push('message:update', updatedMessage)
}

export const deleteMessage = (roomName, messageId) => (dispatch, getState) => {
  const state = getState()
  const channel = getRoomChannel(state, roomName)
  const message = getRoomMessage(state, roomName, messageId)

  return channel.push('message:delete', message)
}
