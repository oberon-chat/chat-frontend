import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { reset as resetForm } from 'redux-form'
import { get, isEmpty } from 'lodash'
import history from '../../app/history'
import { submitMessage } from '../../actions/roomMessages'
import { getCurrentUser } from '../../reducers/currentUser'
import { getLastRoomMessage } from '../../reducers/roomMessages'
import { editMessagePath } from '../../helpers/paths'
import MessageForm from './_Form'

export class NewMessage extends Component {
  componentDidMount () {
    findDOMNode(this)
      .querySelector('textarea[name="message"]')
      .focus()
  }

  render () {
    const { form, lastMessage, onSubmit, room } = this.props
    const onKeyDown = (event, props) => {
      if (event.keyCode === 38 && !get(props, 'input.value')) {
        if (!isEmpty(lastMessage)) {
          history.push(editMessagePath(room, lastMessage.id))
        }
      }
    }

    return (
      <MessageForm
        form={form}
        onKeyDown={onKeyDown}
        onSubmit={onSubmit}
        room={room}
      />
    )
  }
}

const mapStateToProps = (state, { room }) => {
  const currentUser = getCurrentUser(state)
  const lastMessage = getLastRoomMessage(state, room, currentUser.id)

  return {
    form: room + 'NewMessageForm',
    lastMessage: lastMessage,
    room: room
  }
}

const mapDispatchToProps = (dispatch, { room }) => ({
  onSubmit: (data) => {
    dispatch(submitMessage(room, data.message))
    dispatch(resetForm(room + 'NewMessageForm'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage)
