import React from 'react'
import { connect } from 'react-redux'
import { sortBy } from 'lodash'
import { getRoomsByType } from '../../reducers/userSubscriptions'
import { getSupportRooms } from '../../reducers/supportRooms'
import { newDirectMessagePath, newRoomPath, searchRoomsPath } from '../../helpers/paths'
import SidebarRoomsList from './_SidebarList'

const RoomsSidebar = ({ rooms }) => {
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
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  rooms: {
    direct: sortBy(getRoomsByType(state, 'direct'), 'slug'),
    private: sortBy(getRoomsByType(state, 'private'), 'slug'),
    public: sortBy(getRoomsByType(state, 'public'), 'slug'),
    support: sortBy(getSupportRooms(state), 'slug')
  }
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(RoomsSidebar)
