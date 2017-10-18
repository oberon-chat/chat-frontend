import { map } from 'lodash'
import { metas } from '../helpers/presence'

const initialState = {}

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USERS':
      return {
        ...state,
        [action.key]: action.users
      }
    default:
      return state
  }
}

export const getUsersPresence = (state) => state.users
export const getUsers = (state) => (
  map(state.users, (user) => metas(user))
)
export const getUser = (state, key) => {
  const presence = state.users
  const user = presence[key]

  return user ? metas(user) : {}
}

export default usersReducer
