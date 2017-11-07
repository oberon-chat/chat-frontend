import React from 'react'
import { connect } from 'react-redux'
import history from '../../app/history'
import { leaveRoomChannel } from '../../actions/rooms'
import { deleteSubscription } from '../../actions/userSubscriptions'
import notification from '../../helpers/notification'
import { rootPath } from '../../helpers/paths'
import { Menu, Dropdown, Button } from 'antd'

const RoomHeaderActions = ({ handleLeave, isSubscribed, isDirectMessage }) => {
  if (!isSubscribed || isDirectMessage) {
    return null
  }

  const roomSettings = (
    <Menu>
      <Menu.Item>
        { isSubscribed && !isDirectMessage &&
          <button onClick={handleLeave}>Leave Room</button>
        }
      </Menu.Item>
    </Menu>
  )

  return (
    <div className='chat-room-header-actions'>
      <Dropdown overlay={roomSettings} placement='bottomRight'>
        <Button className='anchor' icon='setting' />
      </Dropdown>
    </div>
  )
}

RoomHeaderActions.displayName = 'RoomHeaderActions'

const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch, { room: slug }) => ({
  handleLeave: () => {
    const onSuccess = () => {
      dispatch(leaveRoomChannel(slug))
      notification('Left room ' + slug, 'success')
      history.push(rootPath)
    }

    const onError = () => {
      notification('Error leaving room ' + slug, 'error')
    }

    return dispatch(deleteSubscription(slug, onSuccess, onError))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomHeaderActions)
