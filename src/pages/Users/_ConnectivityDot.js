import React from 'react'
import StatusDot from '../../components/StatusDot'

const UserConnectivityDot = ({ isConnected }) => (
  <StatusDot color={isConnected ? '#6ad439' : '#aaa'} />
)

export default UserConnectivityDot
