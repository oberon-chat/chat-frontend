import React from 'react'
import { connect } from 'react-redux'
import history from '../../app/history'
import { leaveRoomChannel } from '../../actions/rooms'
import { deleteSubscription } from '../../actions/userSubscriptions'
import { getCurrentUser } from '../../reducers/currentUser'
import { getDirectMessageUser } from '../../reducers/roomSubscriptions'
import { getIsSubscribed, getRoom } from '../../reducers/userSubscriptions'
import notification from '../../helpers/notification'
import { rootPath } from '../../helpers/paths'
import Header from '../Layout/_Header'

const RoomHeader = ({ handleLeave, heading, isDirectMessage, isSubscribed }) => {
  return (
    <Header>
      <h2>{ heading }</h2>
      <div className='chat-room-header-actions'>
        { isSubscribed && !isDirectMessage &&
          <button onClick={ handleLeave }>Leave</button>
        }
      </div>
    </Header>
  )
}

RoomHeader.displayName = 'RoomHeader'

const mapStateToProps = (state, { room: slug }) => {
  const currentUser = getCurrentUser(state)
  const room = getRoom(state, slug)
  const isDirectMessage = room.type === 'direct'
  const heading = isDirectMessage ? getDirectMessageUser(state, slug, currentUser).name : (room.name || slug)

  return {
    heading: heading,
    isDirectMessage: isDirectMessage,
    isSubscribed: getIsSubscribed(state, slug)
  }
}

const mapDispatchToProps = (dispatch, { room: slug }) => ({
  handleLeave: () => {
    const onSuccess = () => {
      dispatch(leaveRoomChannel(slug))
      notification('Left room ' + slug, 'success')
      history.push(rootPath)
    }

    const onError = () => {
      notification('Error leaving room ' + slug, 'error')
    }

    return dispatch(deleteSubscription(slug, onSuccess, onError))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomHeader)
