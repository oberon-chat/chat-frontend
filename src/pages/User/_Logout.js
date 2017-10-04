import React from 'react'
import { connect } from 'react-redux'
import history from '../../app/history'
import { createFlashMessage } from '../../actions/flashMessages'
import { logOut } from '../../actions/currentUser'
import { socketClose } from '../../actions/socket'
import { Button, Icon } from 'antd'

export const Logout = ({ flashMessage, onCloseSocket, onLogOut }) => {
  const onClick = () => {
    onLogOut()
    onCloseSocket()
    flashMessage('Successfully logged out', 'success')
    history.push('/')
  }

  return (
    <Button onClick={onClick}>
      <Icon type='logout' />
      {' '}
      Log Out
    </Button>
  )
}

const mapDispatchToProps = (dispatch) => ({
  flashMessage: (title, type, description) => (
    dispatch(createFlashMessage(title, type, description))
  ),
  onCloseSocket: () => dispatch(socketClose()),
  onLogOut: () => dispatch(logOut())
})

export default connect(undefined, mapDispatchToProps)(Logout)
