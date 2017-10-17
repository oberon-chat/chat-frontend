import React from 'react'
import { connect } from 'react-redux'
import { createRoomSubscription } from '../../actions/roomSubscriptions'
import { getIsSubscribed } from '../../reducers/roomSubscriptions'
import EditMessage from '../Messages/_Edit'
import NewMessage from '../Messages/_New'
import { Button } from 'antd'

const RoomFooter = ({ createSubscription, isSubscribed, messageId, room }) => {
  const joinFooter = (
    <div className='chat-join-mesage-footer'>
      Viewing Room <strong>{room}</strong>
      {' '}
      <Button onClick={createSubscription}>Join</Button>
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
  createSubscription: () => dispatch(createRoomSubscription(room))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomFooter)
