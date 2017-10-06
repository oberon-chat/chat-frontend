import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { map } from 'lodash'
import moment from 'moment'
import { joinRooms } from '../../actions/rooms'
import { getRooms } from '../../reducers/rooms'
import { getLastViewed } from '../../reducers/roomsMeta'
import { meta } from '../../helpers/presence'
import CreateRoomForm from './_Form'

export class RoomsList extends Component {
  componentDidMount () {
    this.props.onJoin()
  }

  render () {
    const { rooms, lastViewed } = this.props

    const renderRoom = (room, name) => {
      const lastMessage = meta(room, 'last_message')
      const lastMessageAt = lastMessage ? moment(lastMessage.inserted_at).unix() : 0
      const lastViewedAt = Math.floor((lastViewed(name) || 0) / 1000)
      const classes = lastMessageAt > lastViewedAt ? 'new-message' : ''

      return (
        <li key={name} className={classes}>
          <Link to={'/rooms/' + name}>
            {name}
          </Link>
        </li>
      )
    }

    return (
      <div>
        <h3>Rooms</h3>
        <ul className='rooms-list'>
          { map(rooms, renderRoom) }
        </ul>
        <CreateRoomForm />
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
