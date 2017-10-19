import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import channelsReducer from './channels'
import clientReducer from './client'
import connectedUsersReducer from './connectedUsers'
import currentUserReducer from './currentUser'
import flashMessagesReducer from './flashMessages'
import portableReducer from './portable'
import publicRoomsReducer from './publicRooms'
import roomsReducer from './rooms'
import roomsMetaReducer from './roomsMeta'
import roomMessagesReducer from './roomMessages'
import roomSubscriptionsReducer from './roomSubscriptions'
import socketReducer from './socket'
import supportRoomsReducer from './supportRooms'
import userSubscriptionsReducer from './userSubscriptions'

export default combineReducers({
  client: clientReducer,
  channels: channelsReducer,
  connectedUsers: connectedUsersReducer,
  currentUser: currentUserReducer,
  flashMessages: flashMessagesReducer,
  form: reduxFormReducer,
  portable: portableReducer,
  publicRooms: publicRoomsReducer,
  rooms: roomsReducer,
  roomsMeta: roomsMetaReducer,
  roomMessages: roomMessagesReducer,
  roomSubscriptions: roomSubscriptionsReducer,
  routing: routerReducer,
  socket: socketReducer,
  supportRooms: supportRoomsReducer,
  userSubscriptions: userSubscriptionsReducer
})
