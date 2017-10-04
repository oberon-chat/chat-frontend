import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import clientReducer from './client'
import currentUserReducer from './currentUser'
import flashMessagesReducer from './flashMessages'
import portableReducer from './portable'
import roomsReducer from './rooms'
import roomsJoinedReducer from './roomsJoined'
import roomMessagesReducer from './roomMessages'
import roomUsersReducer from './roomUsers'
import socketReducer from './socket'

export default combineReducers({
  client: clientReducer,
  currentUser: currentUserReducer,
  flashMessages: flashMessagesReducer,
  form: reduxFormReducer,
  portable: portableReducer,
  rooms: roomsReducer,
  roomsJoined: roomsJoinedReducer,
  roomMessages: roomMessagesReducer,
  roomUsers: roomUsersReducer,
  routing: routerReducer,
  socket: socketReducer
})
