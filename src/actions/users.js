import { Presence } from 'phoenix'
import { joinChannel } from './channels'
import { replaceConnectedUsers } from './connectedUsers'
import { updateCurrentUser } from './currentUser'
import { joinAllRoomChannels, replaceUserSubscriptions } from './userSubscriptions'
import { getConnectedUsersPresence } from '../reducers/connectedUsers'
import { camelize, listToObject } from '../helpers/data'

export const replaceUsers = (users) => ({
  type: 'REPLACE_USERS',
  users: users
})

export const joinUsersChannel = (onSuccess, onError) => (dispatch, getState) => {
  const key = 'users'
  const channelCallbacks = (channel) => {
    channel.on('users', (data) => {
      const cased = camelize(data.users)
      const asObject = listToObject(cased)

      dispatch(replaceUsers(asObject))
    })

    channel.on('users:connected:state', (data) => {
      const current = getConnectedUsersPresence(getState())
      const users = Presence.syncState(current, data)

      dispatch(replaceConnectedUsers(users))
    })

    channel.on('users:connected:diff', (data) => {
      const current = getConnectedUsersPresence(getState())
      const users = Presence.syncDiff(current, data)

      dispatch(replaceConnectedUsers(users))
    })

    channel.on('user:current', (data) => {
      dispatch(updateCurrentUser(data))
    })

    channel.on('user:current:subscriptions', (data) => {
      dispatch(replaceUserSubscriptions(camelize(data.subscriptions)))
      dispatch(joinAllRoomChannels())
    })

    return channel
  }

  return joinChannel(dispatch, getState, key, channelCallbacks, onSuccess, onError)
}
