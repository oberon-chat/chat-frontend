const initialState = {
  connected: false,
  connection: null,
  url: 'ws://chat-server.dev/socket'
}

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SOCKET_NEW':
      return {...state, connection: action.connection}
    case 'SOCKET_OPEN':
      return {...state, connected: true}
    case 'CURRENT_USER_LOGOUT':
    case 'SOCKET_CLOSE':
      return initialState
    default:
      return state
  }
}

export const getSocket = (state) => state.socket
export const getSocketConnection = (state) => state.socket.connection
export const getIsConnected = (state) => state.socket.connected
export const withSocketConnection = (getState, callback, attempt = 0, throwOnError = false) => {
  const interval = 25
  const max = Math.ceil(5000 / interval)

  setTimeout(() => {
    if (attempt >= max) {
      if (throwOnError) {
        throw new Error('Could not retrieve socket connection')
      } else {
        return false
      }
    }

    const state = getState()
    const socket = state.socket.connection

    if (socket) {
      return callback(socket)
    } else {
      return withSocketConnection(getState, callback, attempt + 1)
    }
  }, interval)
}

export default socketReducer
