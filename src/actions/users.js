import { Presence } from 'phoenix'
import { joinChannel } from './channels'
import { updateCurrentUser } from './currentUser'
import { getUsersPresence } from '../reducers/users'

const updateUsers = (users) => ({
  type: 'UPDATE_USERS',
  users: users
})

export const joinUsersChannel = (onSuccess, onError) => (dispatch, getState) => {
  const key = 'users'
  const channelCallbacks = (channel) => {
    channel.on('users:state', (data) => {
      const current = getUsersPresence(getState())
      const users = Presence.syncState(current, data)

      dispatch(updateUsers(users))
    })

    channel.on('users:diff', (data) => {
      const current = getUsersPresence(getState())
      const users = Presence.syncDiff(current, data)

      dispatch(updateUsers(users))
    })

    channel.on('users:current', (data) => {
      dispatch(updateCurrentUser(data))
    })

    return channel
  }

  return joinChannel(dispatch, getState, key, channelCallbacks, onSuccess, onError)
}
