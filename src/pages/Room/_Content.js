import React from 'react'
import MessagesList from '../Messages/_List'
import RoomFooter from './_Footer'

const RoomContent = ({ messageId, room }) => (
  <div className='chat-room-content'>
    <div className='scroll-container'>
      <MessagesList editingMessageId={messageId} room={room} />
    </div>
    <RoomFooter messageId={messageId} room={room} />
  </div>
)

RoomContent.displayName = 'RoomContent'

export default RoomContent
