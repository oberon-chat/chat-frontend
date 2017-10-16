import { getRoomChannel } from '../reducers/rooms'
import { getRoomMessage } from '../reducers/roomMessages'

export const addMessage = (slug, message) => ({
  type: 'ADD_ROOM_MESSAGE',
  key: slug,
  message: message
})

export const replaceMessage = (slug, message) => ({
  type: 'REPLACE_ROOM_MESSAGE',
  key: slug,
  message: message
})

export const replaceMessages = (slug, messages) => ({
  type: 'REPLACE_ROOM_MESSAGES',
  key: slug,
  messages: messages
})

export const removeMessage = (slug, message) => ({
  type: 'REMOVE_ROOM_MESSAGE',
  key: slug,
  message: message
})

export const submitMessage = (slug, message) => (dispatch, getState) => {
  const channel = getRoomChannel(getState(), slug)

  return channel.push('message:create', { body: message })
}

export const editMessage = (slug, messageId, body) => (dispatch, getState) => {
  const state = getState()
  const channel = getRoomChannel(state, slug)
  const message = getRoomMessage(state, slug, messageId)
  const updatedMessage = {
    ...message,
    body: body
  }

  return channel.push('message:update', updatedMessage)
}

export const deleteMessage = (slug, messageId) => (dispatch, getState) => {
  const state = getState()
  const channel = getRoomChannel(state, slug)
  const message = getRoomMessage(state, slug, messageId)

  return channel.push('message:delete', message)
}
