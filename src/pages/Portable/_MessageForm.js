import React from 'react'
import { connect } from 'react-redux'
import { reset as resetForm } from 'redux-form'
import { setActiveRoom } from '../../actions/portable'
import { createRoom, joinRooms, joinRoom } from '../../actions/rooms'
import { submitMessage } from '../../actions/roomMessages'
import MessagesForm from '../Messages/_Form'

export const MessageForm = ({ form, onSubmit }) => {
  return (
    <MessagesForm
      form={form}
      onSubmit={onSubmit}
    />
  )
}

MessageForm.displayName = 'PortableMessageForm'

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch, { isActive, form, room }) => ({
  onSubmit: (data) => {
    const onJoinRoom = async () => {
      dispatch(setActiveRoom(room))
      await dispatch(submitMessage(room, data.message))

      return dispatch(resetForm(form))
    }

    const onJoinRooms = async () => {
      const action = (slug) => dispatch(joinRoom(slug, onJoinRoom))
      const onCreateRoom = (response) => action(response.room.slug)

      if (!isActive) {
        await dispatch(createRoom(room, onCreateRoom))
      } else {
        return action(room)
      }
    }

    return dispatch(joinRooms(onJoinRooms))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
