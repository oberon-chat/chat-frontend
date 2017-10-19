import React from 'react'
import { connect } from 'react-redux'
import history from '../app/history'
import { createFlashMessage } from '../actions/flashMessages'
import { logOut } from '../actions/currentUser'
import { getIsConnected } from '../reducers/socket'
import { isClientType } from '../reducers/client'
import { Button } from 'antd'

const ConnectionError = ({ flashMessage, isConnected, isPortable, onLogOut }) => {
  if (isConnected) {
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
  isConnected: getIsConnected(state),
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
