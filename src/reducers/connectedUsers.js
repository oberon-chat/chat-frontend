import { map } from 'lodash'
import { metas } from '../helpers/presence'

const initialState = {}

export const connectedUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REPLACE_CONNECTED_USERS':
      return action.users
    default:
      return state
  }
}

export const getConnectedUsersPresence = (state) => state.connectedUsers
export const getConnectedUsers = (state) => (
  map(state.connectedUsers, (user) => metas(user))
)
export const getConnectedUser = (state, id) => {
  const presence = state.connectedUsers
  const user = presence[id]

  return user ? metas(user) : {}
}
export const getIsConnected = (state, id) => !!state.connectedUsers[id]

export default connectedUsersReducer
