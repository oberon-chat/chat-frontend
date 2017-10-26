import { withSocketConnection } from '../reducers/socket'
import { getChannel } from '../reducers/channels'

export const joinChannel = (dispatch, getState, key, channelCallbacks, onSuccess, onError) => {
  const channel = getChannel(getState(), key)

  if (channel.state === 'joined') {
    if (onSuccess) {
      return onSuccess()
    }

    return channel
  }

  withSocketConnection(getState, (connection) => {
    let channel = connection.channel(key, {})

    if (channelCallbacks) {
      channel = channelCallbacks(channel)
    }

    const onJoinSuccess = () => {
      dispatch({
        type: 'CHANNEL_JOIN',
        key: key,
        channel: channel
      })

      return onSuccess ? onSuccess() : channel
    }

    const onJoinError = (error) => {
      return onError ? onError(error) : false
    }

    return channel.join()
      .receive('ok', onJoinSuccess)
      .receive('error', onJoinError)
  })
}

export const leaveChannel = (key) => ({
  type: 'CHANNEL_LEAVE',
  key: key
})
