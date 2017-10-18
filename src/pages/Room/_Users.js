import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { getIsConnected } from '../../reducers/connectedUsers'
import { getUsers } from '../../reducers/roomSubscriptions'
import StatusDot from '../../components/StatusDot'

export const RoomUsers = ({ isConnected, users }) => (
  <div className='scroll-container'>
    <h3>Users</h3>
    <ul>
      { map(users, (user) => (
        <li key={ user.id }>
          <StatusDot color={ isConnected(user.id) ? '#6ad439' : '#aaa' } />
          { user.name }
        </li>
      ))}
    </ul>
  </div>
)

RoomUsers.displayName = 'RoomUsers'

const mapStateToProps = (state, { room }) => ({
  isConnected: (id) => getIsConnected(state, id),
  users: getUsers(state, room)
})

export default connect(mapStateToProps)(RoomUsers)
