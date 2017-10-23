import React from 'react'
import { connect } from 'react-redux'
import { map, sortBy } from 'lodash'
import { getIsConnected } from '../../reducers/connectedUsers'
import { getCurrentUser } from '../../reducers/currentUser'
import { getDirectMessageUser } from '../../reducers/roomSubscriptions'
import { getRoomsByType } from '../../reducers/userSubscriptions'
import { getSupportRooms } from '../../reducers/supportRooms'
import { newDirectMessagePath, newRoomPath, searchRoomsPath } from '../../helpers/paths'
import InvisibleContainer from '../../components/InvisibleContainer'
import SidebarRoomsList from './_SidebarList'
import UserConnectivityDot from '../Users/_ConnectivityDot'

const RoomsSidebar = ({ rooms }) => {
  const displayDirectMessage = ({ directMessageUser: user }) => (
    <InvisibleContainer>
      <UserConnectivityDot isConnected={user.isConnected} />
      { user.name }
    </InvisibleContainer>
  )

  return (
    <div id='rooms-sidebar'>
      <SidebarRoomsList
        title='Support Rooms'
        titleLink={searchRoomsPath()}
        rooms={rooms.support}
      />
      <SidebarRoomsList
        title='Public Rooms'
        titleLink={searchRoomsPath()}
        newLink={newRoomPath()}
        rooms={rooms.public}
      />
      <SidebarRoomsList
        title='Private Rooms'
        titleLink={searchRoomsPath()}
        newLink={newRoomPath()}
        rooms={rooms.private}
      />
      <SidebarRoomsList
        title='Direct Messages'
        titleLink={newDirectMessagePath()}
        newLink={newDirectMessagePath()}
        rooms={rooms.direct}
        displayRoom={displayDirectMessage}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  const currentUser = getCurrentUser(state)
  const directMessages = map(getRoomsByType(state, 'direct'), (room) => {
    room.directMessageUser = getDirectMessageUser(state, room.slug, currentUser)
    room.directMessageUser.isConnected = getIsConnected(state, room.directMessageUser.id)

    return room
  })

  return {
    rooms: {
      direct: sortBy(directMessages, (room) => room.directMessageUser.name),
      private: sortBy(getRoomsByType(state, 'private'), 'slug'),
      public: sortBy(getRoomsByType(state, 'public'), 'slug'),
      support: sortBy(getSupportRooms(state), 'slug')
    }
  }
}

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(RoomsSidebar)
