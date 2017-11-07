import React from 'react'
import RoomUsers from './_Users'

const RoomDetails = ({ room }) => (
  <div className='chat-room-details'>
    <RoomUsers room={room} />
  </div>
)

RoomDetails.displayName = 'RoomDetails'

export default RoomDetails
