import React from 'react'
import { connect } from 'react-redux'
import { createSubscription } from '../../actions/userSubscriptions'
import { getIsSubscribed } from '../../reducers/userSubscriptions'
import EditMessage from '../Messages/_Edit'
import NewMessage from '../Messages/_New'
import { Button } from 'antd'

const RoomFooter = ({ isSubscribed, joinRoom, messageId, room }) => {
  const joinFooter = (
    <div className='chat-join-mesage-footer'>
      Viewing Room <strong>{room}</strong>
      {' '}
      <Button onClick={joinRoom}>Join</Button>
    </div>
  )
  const messageFooter = messageId
    ? <EditMessage key={room} messageId={messageId} room={room} />
    : <NewMessage key={room} room={room} />

  return (
    <div className='chat-room-content-footer'>
      { isSubscribed ? messageFooter : joinFooter }
    </div>
  )
}

RoomFooter.displayName = 'RoomFooter'

const mapStateToProps = (state, { room }) => ({
  isSubscribed: getIsSubscribed(state, room)
})

const mapDispatchToProps = (dispatch, { room }) => ({
  joinRoom: () => dispatch(createSubscription(room))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomFooter)
