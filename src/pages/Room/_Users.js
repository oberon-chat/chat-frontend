import React from 'react'
import { connect } from 'react-redux'
import { map, reduce, sortBy } from 'lodash'
import { getIsConnected } from '../../reducers/connectedUsers'
import { getUsers } from '../../reducers/roomSubscriptions'
import UserConnectivityDot from '../Users/_ConnectivityDot'

export const RoomUsers = ({ users }) => (
  <div className='scroll-container'>
    <h3>Users</h3>
    <ul>
      { map(users, (user) => (
        <li key={user.id}>
          <UserConnectivityDot isConnected={user.isConnected} />
          { user.name }
        </li>
      ))}
    </ul>
  </div>
)

RoomUsers.displayName = 'RoomUsers'

const mapStateToProps = (state, { room }) => {
  const users = getUsers(state, room)
  const grouped = reduce(users, (acc, user) => {
    if (getIsConnected(state, user.id)) {
      user.isConnected = true
      acc.connected.push(user)
    } else {
      user.isConnected = false
      acc.disconnected.push(user)
    }

    return acc
  }, {connected: [], disconnected: []})
  const connected = sortBy(grouped.connected, 'name')
  const disconnected = sortBy(grouped.disconnected, 'name')
  const ordered = connected.concat(disconnected)

  return {
    users: ordered
  }
}

export default connect(mapStateToProps)(RoomUsers)
