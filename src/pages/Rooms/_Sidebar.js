import React from 'react'
import { connect } from 'react-redux'
import { sortBy } from 'lodash'
import { getRoomsByType } from '../../reducers/userSubscriptions'
import { getSupportRooms } from '../../reducers/supportRooms'
import SidebarRoomsList from './_SidebarList'

const RoomsSidebar = ({ rooms }) => {
  return (
    <div id='rooms-sidebar'>
      <SidebarRoomsList title='Support Rooms' rooms={rooms.support} />
      <SidebarRoomsList title='Public Rooms' rooms={rooms.public} />
      <SidebarRoomsList title='Private Rooms' rooms={rooms.private} />
      <SidebarRoomsList title='Direct Messages' rooms={rooms.direct} />
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
