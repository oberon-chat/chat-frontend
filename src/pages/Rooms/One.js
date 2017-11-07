import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../app/history'
import { joinRoomChannel, viewRoom } from '../../actions/rooms'
import notification from '../../helpers/notification'
import RoomContent from './_Content'
import RoomHeader from './_Header'
import RoomDetails from './_Details'
import Content from '../Layout/_Content'
import Main from '../Layout/_Main'

class OneRoom extends Component {
  componentDidMount () {
    this.props.onJoin(this.props.room)
  }

  componentWillReceiveProps (next) {
    if (this.props.room !== next.room) {
      this.props.onJoin(next.room)
    }
  }

  render () {
    const { messageId, room } = this.props

    return (
      <Main classes='chat-room'>
        <RoomHeader room={room} />
        <Content>
          <RoomContent messageId={messageId} room={room} />
          <RoomDetails room={room} />
        </Content>
      </Main>
    )
  }
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(OneRoom)
