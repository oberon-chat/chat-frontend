import { joinChannel } from './channels'

export const joinUsers = (onSuccess, onError) => (dispatch, getState) => {
  const key = 'users'
  const channelCallbacks = (channel) => {
    channel.on('users:current', (data) => {
      // const current = getUsers(getState())
      // const updated = Presence.syncState(current, data)

      // dispatch(updateUsers(updated))
    })

    return channel
  }

  return joinChannel(dispatch, getState, key, channelCallbacks, onSuccess, onError)
}
