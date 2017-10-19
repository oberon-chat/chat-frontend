import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeChat, newChat, openChat, setActiveRoom } from '../../actions/portable'
import { joinRoomChannel, joinRoomsChannel } from '../../actions/rooms'
import { joinUsersChannel } from '../../actions/users'
import { fetchSocket, socketClose } from '../../actions/socket'
import { getActiveRoom, getHasRecentActivity, getIsOpen } from '../../reducers/portable'
import { getIsConnected } from '../../reducers/socket'
import { shortUuid } from '../../helpers/uuid'
import ConnectionError from '../../components/ConnectionError'
import MessagesList from '../Messages/_List'
import MessageForm from './_MessageForm'
import '../../static/antd-portable.css'
import '../../static/common.css'
import '../../static/portable.css'

const Closed = ({ onOpen }) => {
  const onClick = (event) => {
    if (event) { event.preventDefault() }

    return onOpen()
  }

  return (
    <a onClick={onClick}>Chat</a>
  )
}

const Opened = ({ isActive, onClose, onNew, room }) => {
  const handleClose = (event) => {
    if (event) { event.preventDefault() }

    return onClose()
  }

  const handleNew = (event) => {
    if (event) { event.preventDefault() }

    return onNew()
  }

  return (
    <div className='chat-portable-open'>
      { isActive && <ConnectionError /> }
      <a onClick={handleClose}>Minimize</a>
      <a onClick={handleNew}>New Chat</a>
      <div className='chat-container scroll-container'>
        { isActive ? <MessagesList room={room} /> : <span>How can we help?</span> }
      </div>
      <div className='chat-form-container'>
        <MessageForm
          form='portableMessageForm'
          isActive={isActive}
          room={room}
        />
      </div>
    </div>
  )
}

class Portable extends Component {
  componentWillMount () {
    const { isActive, room } = this.props

    this.props.onLoad(room, isActive)
  }

  componentWillReceiveProps (next) {
    const isReconnect = (this.props.isConnected === false && next.isConnected === true)

    if (isReconnect) {
      this.props.onLoad(next.room, next.isActive)
    }
  }

  render () {
    const { isActive, isClosed, onClose, onNew, onOpen, room } = this.props
    const classnames = 'chat-portable ' + (isClosed ? 'closed' : 'open')

    if (isClosed) {
      return (
        <div className={classnames}>
          <Closed onOpen={onOpen} />
        </div>
      )
    }

    return (
      <div className={classnames}>
        <Opened
          isActive={isActive}
          onClose={onClose}
          onNew={onNew}
          room={room}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const newRoom = 'user-' + shortUuid()
  const isActive = getHasRecentActivity(state)
  const activeRoom = getActiveRoom(state)

  return {
    isActive: isActive,
    isClosed: !getIsOpen(state),
    isConnected: getIsConnected(state),
    room: isActive ? activeRoom : newRoom
  }
}

const mapDispatchToProps = (dispatch) => {
  const onNew = () => {
    const afterFetch = () => dispatch(newChat())
    const afterClose = () => dispatch(fetchSocket(afterFetch))

    dispatch(socketClose(afterClose))
  }

  const onLoad = (room, isActive) => {
    let afterFetch

    if (isActive) {
      const onJoinRoomSuccess = () => dispatch(setActiveRoom(room))
      const onJoinRoomError = () => onNew()
      const afterJoinRooms = () => dispatch(joinRoomChannel(room, onJoinRoomSuccess, onJoinRoomError))
      const afterJoinUsers = () => dispatch(joinRoomsChannel(afterJoinRooms))

      afterFetch = () => dispatch(joinUsersChannel(afterJoinUsers))
    }

    dispatch(fetchSocket(afterFetch))
  }

  return {
    onClose: () => dispatch(closeChat()),
    onLoad: onLoad,
    onNew: onNew,
    onOpen: () => dispatch(openChat())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portable)
