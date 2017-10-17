import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { map } from 'lodash'
import moment from 'moment'
import { getLastViewed } from '../../reducers/roomsMeta'
import { meta } from '../../helpers/presence'
import { newRoomPath } from '../../helpers/paths'
import { Icon } from 'antd'

const RoomsList = ({ lastViewed, rooms, title }) => {
  const renderRoom = (room) => {
    const lastMessage = meta(room, 'last_message')
    const lastMessageAt = lastMessage ? moment(lastMessage.inserted_at).unix() : 0
    const lastViewedAt = Math.floor((lastViewed(room) || 0) / 1000)
    const classes = lastMessageAt > lastViewedAt ? 'new-message' : ''

    return (
      <li key={room.slug} className={classes}>
        <Link to={'/rooms/' + room.slug}>
          {room.slug}
        </Link>
      </li>
    )
  }

  return (
    <div className='rooms-list-container'>
      <div className='chat-rooms-list-heading'>
        <h3>{title}</h3>
        <Link className='chat-new-room-link' to={newRoomPath()}>
          <Icon type='plus-circle-o' />
        </Link>
      </div>
      <ul className='rooms-list'>
        { map(rooms, renderRoom) }
      </ul>
    </div>
  )
}

const mapStateToProps = (state, { type }) => ({
  lastViewed: (key) => getLastViewed(state, key)
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList)
