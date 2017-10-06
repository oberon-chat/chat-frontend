import { isEqual } from 'lodash'

const initialState = {}

export const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CURRENT_USER_UPDATE':
    case 'CURRENT_USER_LOGIN':
      return {
        ...state,
        ...action.values
      }
    case 'CURRENT_USER_LOGOUT':
      return initialState
    default:
      return state
  }
}

export const isLoggedIn = (state) => !isEqual(initialState, state.currentUser)

export const getCurrentUser = (state) => state.currentUser

export const getCurrentUserId = (state) => parseInt(getCurrentUser(state).id, 10)

export const tokenHasExpired = (state) => {
  const expiration = state.currentUser.token_expiration

  if (!expiration) { return false }

  const asInt = parseInt(expiration, 10)
  const now = Math.floor(Date.now() / 1000)

  return now >= asInt
}

export default currentUserReducer
