import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { isEmpty, map } from 'lodash'
import moment from 'moment'
import { getLastRoomMessage, getRoomMessagesAfter } from '../../reducers/roomMessages'
import { getViewedAt } from '../../reducers/userSubscriptions'
import { getViewing } from '../../reducers/roomsMeta'
import { Icon } from 'antd'

const RoomsSidebarList = ({ displayRoom, focusedRoom, lastMessage, newLink, roomMessagesAfter, rooms, title, titleLink, viewedAt }) => {
  const renderRoom = (room) => {
    const lastRoomMessage = lastMessage(room)
    const lastMessageAt = isEmpty(lastRoomMessage) ? 0 : moment(lastRoomMessage.insertedAt).unix()
    const lastViewedAt = moment(viewedAt(room) || 0).unix()
    const isFocused = (focusedRoom === room.slug)
    const hasNewMessages = !isFocused && (lastMessageAt > lastViewedAt)
    const classes = hasNewMessages ? 'new-message' : ''

    let notifications

    if (hasNewMessages && room.type === 'direct') {
      notifications = roomMessagesAfter(room, lastViewedAt).length
    }

    return (
      <li key={room.slug} className={classes}>
        <Link className='chat-room-link' to={'/rooms/' + room.slug}>
          {displayRoom ? displayRoom(room, notifications) : room.slug}
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
  focusedRoom: getViewing(state),
  lastMessage: (room) => getLastRoomMessage(state, room.slug),
  roomMessagesAfter: (room, timestamp) => getRoomMessagesAfter(state, room.slug, timestamp),
  viewedAt: (room) => getViewedAt(state, room.slug)
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(RoomsSidebarList)
