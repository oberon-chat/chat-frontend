import React from 'react'
import { connect } from 'react-redux'
import history from '../app/history'
import { createFlashMessage } from '../actions/flashMessages'
import { logOut } from '../actions/currentUser'
import { isConnected } from '../reducers/socket'
import { isClientType } from '../reducers/client'
import { Button } from 'antd'

const ConnectionError = ({ connected, flashMessage, isPortable, onLogOut }) => {
  if (connected) {
    return null
  }

  const handleReset = (event) => {
    if (event) {
      event.preventDefault()
    }

    onLogOut()
    flashMessage('Successfully logged out', 'success')
    history.push('/')
  }

  return (
    <div className='chat-overlay'>
      <div className='connection-error'>
        <p>
          Reconnecting...
          { !isPortable &&
            <span>
              or <Button onClick={handleReset}>Log Out</Button>
            </span>
          }
        </p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  connected: isConnected(state),
  isPortable: isClientType(state, 'portable')
})

const mapDispatchToProps = (dispatch) => ({
  flashMessage: (title, type, description) => (
    dispatch(createFlashMessage(title, type, description))
  ),
  onLogOut: () => dispatch(logOut())
})

ConnectionError.displayName = 'ConnectionError'

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionError)
