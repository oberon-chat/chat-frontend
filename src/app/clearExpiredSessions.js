import store from './store'
import { logOut } from '../actions/currentUser'
import { tokenHasExpired } from '../reducers/currentUser'

export const clearExpiredSessions = () => {
  if (tokenHasExpired(store.getState())) {
    store.dispatch(logOut())
  }
}

export default clearExpiredSessions
