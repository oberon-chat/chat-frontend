import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { getRoomMessages } from '../../reducers/roomMessages'
import { Card } from 'antd'

export const RoomMessages = ({ messages }) => (
  <div>
    { map(messages, (message) => (
      <Card key={message.timestamp} style={{ marginTop: '15px' }}>
        <strong>{message.user}</strong>
        {' '}
        {new Date(message.timestamp).toLocaleTimeString()}
        <br />
        {message.body}
      </Card>
    ))}
  </div>
)

RoomMessages.displayName = 'RoomMessages'

const mapStateToProps = (state, { room }) => ({
  messages: getRoomMessages(state, room)
})

export default connect(mapStateToProps)(RoomMessages)
