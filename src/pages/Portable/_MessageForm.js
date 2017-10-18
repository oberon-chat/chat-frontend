import React from 'react'
import { connect } from 'react-redux'
import { reset as resetForm } from 'redux-form'
import { setActiveRoom } from '../../actions/portable'
import { createRoom, joinRoomChannel, joinRoomsChannel } from '../../actions/rooms'
import { joinUsersChannel } from '../../actions/users'
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
    const afterJoinRoom = async () => {
      dispatch(setActiveRoom(room))
      await dispatch(submitMessage(room, data.message))

      return dispatch(resetForm(form))
    }

    const afterJoinRooms = async () => {
      const action = (slug) => dispatch(joinRoomChannel(slug, afterJoinRoom))
      const onCreateRoom = (response) => action(response.room.slug)

      if (!isActive) {
        await dispatch(createRoom(room, 'support', onCreateRoom))
      } else {
        return action(room)
      }
    }

    const afterJoinUsers = () => dispatch(joinRoomsChannel(afterJoinRooms))

    return dispatch(joinUsersChannel(afterJoinUsers))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
