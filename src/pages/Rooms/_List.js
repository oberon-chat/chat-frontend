import React from 'react'
import { map } from 'lodash'
import history from '../../app/history'
import { roomPath } from '../../helpers/paths'
import { Button } from 'antd'

const RoomsList = ({ rooms }) => {
  const renderRoom = (room) => {
    return (
      <li key={room.slug}>
        <h3>{room.slug}</h3>
        <Button icon='arrow-right' onClick={() => history.push(roomPath(room))}>
          View
        </Button>
      </li>
    )
  }

  return (
    <div className='chat-rooms-list-container scroll-container'>
      <ul className='chat-rooms-list'>
        { map(rooms, renderRoom) }
      </ul>
    </div>
  )
}

RoomsList.displayName = 'RoomsList'

export default RoomsList
