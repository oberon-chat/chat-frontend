import React from 'react'
import { connect } from 'react-redux'
import { map, sortBy } from 'lodash'
import history from '../../app/history'
import { updateSubscription } from '../../actions/userSubscriptions'
import { getIsConnected } from '../../reducers/connectedUsers'
import { getCurrentUser } from '../../reducers/currentUser'
import { getDirectMessageUser } from '../../reducers/roomSubscriptions'
import { getOpenRoomsByType, getRoomsByType } from '../../reducers/userSubscriptions'
import { getSupportRooms } from '../../reducers/supportRooms'
import { newDirectMessagePath, newRoomPath, roomPath, rootPath, searchRoomsPath } from '../../helpers/paths'
import InvisibleContainer from '../../components/InvisibleContainer'
import SidebarRoomsList from './_SidebarList'
import UserConnectivityDot from '../Users/_ConnectivityDot'
import { Icon } from 'antd'

const RoomsSidebar = ({ handleDirectMessageClose, rooms }) => {
  const displayDirectMessage = (room) => {
    const { directMessageUser: user } = room
    const handleClick = (event) => {
      if (event) {
        event.preventDefault()
      }

      return handleDirectMessageClose(room)
    }

    return (
      <InvisibleContainer>
        <div>
          <UserConnectivityDot isConnected={user.isConnected} />
          { user.name }
        </div>
        <button className='anchor' onClick={handleClick}>
          <Icon type='close-circle-o' />
        </button>
      </InvisibleContainer>
    )
  }

  return (
    <div id='rooms-sidebar'>
      <SidebarRoomsList
        title='Support Rooms'
        titleLink={searchRoomsPath}
        rooms={rooms.support}
      />
      <SidebarRoomsList
        title='Public Rooms'
        titleLink={searchRoomsPath}
        newLink={newRoomPath}
        rooms={rooms.public}
      />
      <SidebarRoomsList
        title='Private Rooms'
        titleLink={searchRoomsPath}
        newLink={newRoomPath}
        rooms={rooms.private}
      />
      <SidebarRoomsList
        title='Direct Messages'
        titleLink={newDirectMessagePath}
        newLink={newDirectMessagePath}
        rooms={rooms.direct}
        displayRoom={displayDirectMessage}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  const currentUser = getCurrentUser(state)
  const directMessages = map(getOpenRoomsByType(state, 'direct'), (room) => {
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

const mapDispatchToProps = (dispatch) => ({
  handleDirectMessageClose: (room) => {
    const onSuccess = () => {
      if (window.location.pathname === roomPath(room)) {
        history.push(rootPath)
      }
    }

    return dispatch(updateSubscription(room.slug, {state: 'closed'}, onSuccess))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomsSidebar)
