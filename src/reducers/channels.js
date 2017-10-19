import { map, omit } from 'lodash'

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

export default channelsReducer
