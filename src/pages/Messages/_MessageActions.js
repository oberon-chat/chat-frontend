import React from 'react'
import { connect } from 'react-redux'
import history from '../../app/history'
import { deleteMessage } from '../../actions/roomMessages'
import { editMessagePath } from '../../helpers/paths'
import { Button, Modal } from 'antd'

const Actions = ({ currentUser, message, onDelete, room }) => {
  const { body, id, user } = message

  const OwnerActions = () => {
    if (currentUser.id !== user.id) {
      return null
    }

    const onDeleteConfirm = (event) => {
      if (event) { event.preventDefault() }

      Modal.confirm({
        cancelText: 'Cancel',
        content: body,
        okText: 'Delete',
        onCancel: () => false,
        onOk: () => {
          onDelete(id)
          return false
        },
        title: 'Do you want to delete message?'
      })
    }

    const onEdit = (event) => {
      if (event) { event.preventDefault() }

      history.push(editMessagePath(room, id))
    }

    return (
      <div className='message-actions'>
        <Button.Group>
          <Button icon='edit' onClick={onEdit} />
          <Button icon='delete' onClick={onDeleteConfirm} />
        </Button.Group>
      </div>
    )
  }

  return (
    <div className='actions'>
      <OwnerActions />
    </div>
  )
}

Actions.displayName = 'MessageActions'

const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch, { room }) => ({
  onDelete: (id) => dispatch(deleteMessage(room, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
