import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../app/history'
import { joinRoomChannel, viewRoom } from '../../actions/rooms'
import { getCurrentUser } from '../../reducers/currentUser'
import { getDirectMessageUser } from '../../reducers/roomSubscriptions'
import { getRoom } from '../../reducers/userSubscriptions'
import notification from '../../helpers/notification'
import RoomContent from './_Content'
import RoomSidebar from './_Sidebar'
import Content from '../Layout/_Content'
import Header from '../Layout/_Header'
import Main from '../Layout/_Main'

class Room extends Component {
  componentDidMount () {
    this.props.onJoin(this.props.room)
  }

  componentWillReceiveProps (next) {
    if (this.props.room !== next.room) {
      this.props.onJoin(next.room)
    }
  }

  render () {
    const { heading, messageId, room } = this.props

    return (
      <Main classes='chat-room'>
        <Header>
          <h2>{ heading }</h2>
        </Header>
        <Content>
          <RoomContent messageId={messageId} room={room} />
          <RoomSidebar room={room} />
        </Content>
      </Main>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  const currentUser = getCurrentUser(state)
  const room = getRoom(state, match.params.room)
  const heading = room.type === 'direct' ? getDirectMessageUser(state, match.params.room, currentUser).name : room.name

  return {
    heading: heading,
    messageId: match.params.messageId,
    room: match.params.room
  }
}

const mapDispatchToProps = (dispatch, { match }) => ({
  onJoin: (room) => {
    const onSuccess = () => {
      dispatch(viewRoom(room))
    }

    const onError = () => {
      notification('Error joining room ' + room, 'error')
      history.push('/rooms')
    }

    dispatch(joinRoomChannel(room, onSuccess, onError))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Room)
