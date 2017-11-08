import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { isEmpty, map } from 'lodash'
import moment from 'moment'
import { getLastRoomMessage } from '../../reducers/roomMessages'
import { getViewedAt } from '../../reducers/userSubscriptions'
import { Icon } from 'antd'

const RoomsSidebarList = ({ displayRoom, lastMessage, newLink, rooms, title, titleLink, viewedAt }) => {
  const renderRoom = (room) => {
    const lastRoomMessage = lastMessage(room)
    const lastMessageAt = isEmpty(lastRoomMessage) ? 0 : moment(lastRoomMessage.insertedAt).unix()
    const lastViewedAt = moment(viewedAt(room) || 0).unix()
    const classes = lastMessageAt > lastViewedAt ? 'new-message' : ''

    return (
      <li key={room.slug} className={classes}>
        <Link className='chat-room-link' to={'/rooms/' + room.slug}>
          {displayRoom ? displayRoom(room) : room.slug}
        </Link>
      </li>
    )
  }

  return (
    <div className='chat-sidebar-rooms-list-container'>
      <div className='chat-rooms-list-heading'>
        <h3>
          <Link to={titleLink}>
            {title}
          </Link>
        </h3>
        {newLink &&
          <Link className='chat-new-room-link' to={newLink}>
            <Icon type='plus-circle-o' />
          </Link>
        }
      </div>
      <ul className='chat-sidebar-rooms-list'>
        { map(rooms, renderRoom) }
      </ul>
    </div>
  )
}

const mapStateToProps = (state, { type }) => ({
  lastMessage: (room) => getLastRoomMessage(state, room.slug),
  viewedAt: (room) => getViewedAt(state, room.slug)
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(RoomsSidebarList)
