import { deleteToken, updateToken } from '../helpers/token'
import { resetAllStores } from '../app/graphql'

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

export const updatePreferences = (values) => ({
  type: 'CURRENT_USER_UPDATE_PREFERENCES',
  values
})
