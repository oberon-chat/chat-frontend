import { isEmpty, map, omit } from 'lodash'

const initialState = {}

export const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANNEL_JOIN':
      return {
        ...state,
        [action.key]: action.channel
      }
    case 'CHANNEL_LEAVE':
      state[action.key].leave()

      return omit(state, action.key)
    case 'CURRENT_USER_LOGOUT':
    case 'SOCKET_CLOSE':
      map(state, (channel) => channel.leave())

      return initialState
    default:
      return state
  }
}

export const getChannels = (state) => state.channels || {}
export const getChannel = (state, key) => getChannels(state)[key] || {}
export const withChannel = (getState, key, callback, attempt = 0, throwOnError = false) => {
  const interval = 25
  const max = Math.ceil(3000 / interval)

  if (attempt >= max) {
    if (throwOnError) {
      throw new Error('Could not retrieve channel connection')
    } else {
      return false
    }
  }

  const channel = getChannel(getState(), key)

  if (!isEmpty(channel)) {
    return callback(channel)
  } else {
    return setTimeout(() => {
      withChannel(getState, key, callback, attempt + 1, throwOnError)
    }, interval)
  }
}

export default channelsReducer
