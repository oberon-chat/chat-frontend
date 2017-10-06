const initialState = {}

export const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANNEL_JOIN':
      return {
        ...state,
        [action.key]: action.channel
      }
    case 'CHANNEL_LEAVE':
      delete state[action.key]
      return state
    case 'SOCKET_CLOSE':
      return initialState
    default:
      return state
  }
}

export const getChannels = (state) => state.channels || {}
export const getChannel = (state, key) => getChannels(state)[key] || {}

export default channelsReducer
