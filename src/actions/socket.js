import { Socket } from 'phoenix'
import { getSocket } from '../reducers/socket'
import { getCurrentUser } from '../reducers/currentUser'

export const socketOpen = () => ({
  type: 'SOCKET_OPEN'
})

export const socketClose = (callback) => (dispatch, getState) => {
  const state = getState()
  const socket = getSocket(state)
  const socketClose = () => dispatch({ type: 'SOCKET_CLOSE' })
  const handleDisconnect = () => {
    socketClose()

    if (callback) {
      callback()
    }
  }

  if (socket && socket.connection) {
    socket.connection.disconnect(handleDisconnect)
  } else {
    handleDisconnect()
  }
}

export const socketError = (message) => ({
  type: 'SOCKET_ERROR',
  key: 'socket',
  error: {reason: message}
})

export const fetchSocket = (callback) => (dispatch, getState) => {
  const state = getState()
  const socket = getSocket(state)
  const user = getCurrentUser(state)
  const initialized = socket && socket.connection

  if (!initialized && socket.url) {
    const userParams = { token: user.token }
    const guestParams = { type: 'guest', name: user.name || '' }
    const params = user.token ? userParams : guestParams
    const connection = new Socket(socket.url, { params: params })

    connection.onOpen(() => dispatch(socketOpen()))
    connection.onClose(() => dispatch(socketClose()))
    connection.onError((message) => dispatch(socketError(message)))
    connection.connect()

    dispatch({type: 'SOCKET_NEW', connection})
  }

  if (callback) {
    callback()
  }
}
