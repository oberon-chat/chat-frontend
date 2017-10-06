import { deleteToken, updateToken } from '../helpers/token'
import { resetAllStores } from '../app/graphql'
import { joinChannel } from './channels'

export const logIn = (values) => {
  updateToken(values.token)

  return {
    type: 'CURRENT_USER_LOGIN',
    values
  }
}

export const logOut = () => {
  deleteToken()
  resetAllStores()

  return {
    type: 'CURRENT_USER_LOGOUT'
  }
}

export const updateCurrentUser = (values) => {
  return {
    type: 'CURRENT_USER_UPDATE',
    values
  }
}

export const joinUsersChannel = (onSuccess, onError) => (dispatch, getState) => {
  const key = 'users'
  const channelCallbacks = (channel) => {
    channel.on('users:current', (data) => {
      dispatch(updateCurrentUser(data))
    })

    return channel
  }

  return joinChannel(dispatch, getState, key, channelCallbacks, onSuccess, onError)
}
