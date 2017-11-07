import React from 'react'
import { map } from 'lodash'
import Room from './One'
import Main from '../Layout/_Main'

const Rooms = ({ match }) => {
  const { messageId, roomId } = match.params
  const rooms = roomId.split(',')

  return (
    <Main>
      { map(rooms, (room) => <Room messageId={messageId} room={room} />) }
    </Main>
  )
}

export default Rooms
