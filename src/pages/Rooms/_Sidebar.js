import React from 'react'
import { connect } from 'react-redux'
import { sortBy } from 'lodash'
import { getRoomsByType } from '../../reducers/roomSubscriptions'
import { getSupportRooms } from '../../reducers/supportRooms'
import RoomsList from './_List'

const RoomsSidebar = ({ rooms }) => {
  return (
    <div id='rooms-sidebar'>
      <RoomsList title='Support Rooms' rooms={rooms.support} />
      <RoomsList title='Public Rooms' rooms={rooms.public} />
      <RoomsList title='Private Rooms' rooms={rooms.private} />
      <RoomsList title='Direct Messages' rooms={rooms.direct} />
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
