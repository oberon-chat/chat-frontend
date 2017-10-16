import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { map } from 'lodash'
import moment from 'moment'
import { joinRooms } from '../../actions/rooms'
import { getRooms } from '../../reducers/rooms'
import { getLastViewed } from '../../reducers/roomsMeta'
import { meta } from '../../helpers/presence'
import { newRoomPath } from '../../helpers/paths'
import { Icon } from 'antd'

export class RoomsList extends Component {
  componentDidMount () {
    this.props.onJoin()
  }

  render () {
    const { rooms, lastViewed } = this.props

    const renderRoom = (room, slug) => {
      const lastMessage = meta(room, 'last_message')
      const lastMessageAt = lastMessage ? moment(lastMessage.inserted_at).unix() : 0
      const lastViewedAt = Math.floor((lastViewed(slug) || 0) / 1000)
      const classes = lastMessageAt > lastViewedAt ? 'new-message' : ''

      return (
        <li key={slug} className={classes}>
          <Link to={'/rooms/' + slug}>
            {slug}
          </Link>
        </li>
      )
    }

    return (
      <div className='rooms-list-container'>
        <div className='chat-rooms-list-heading'>
          <h3>Rooms</h3>
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
}

const mapStateToProps = (state) => ({
  lastViewed: (key) => getLastViewed(state, key),
  rooms: getRooms(state)
})

const mapDispatchToProps = (dispatch) => ({
  onJoin: () => dispatch(joinRooms())
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList)
