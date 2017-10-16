import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, reset as resetForm } from 'redux-form'
import history from '../../app/history'
import { createRoom } from '../../actions/rooms'
import notification from '../../helpers/notification'
import { Button, Form, Icon, Input } from 'antd'

const RoomInput = (props) => (
  <Input
    placeholder={'Create room'}
    {...props.input}
  />
)

export const CreateRoomForm = ({ handleSubmit, pristine, room, submitting }) => (
  <Form layout='inline' onSubmit={handleSubmit}>
    <Form.Item>
      <Field name='room' component={RoomInput} />
    </Form.Item>
    <Button
      type='primary'
      htmlType='submit'
      loading={submitting}
      disabled={pristine || submitting}
    >
      <Icon type='plus' style={{ fontSize: '13px' }} />
    </Button>
  </Form>
)

CreateRoomForm.displayName = 'CreateRoomForm'

const ReduxForm = reduxForm()(CreateRoomForm)

const mapStateToProps = (state) => ({
  form: 'createRoomForm'
})

const mapDispatchToProps = (dispatch, { room }) => ({
  onSubmit: async (data) => {
    const onSuccess = (response) => {
      dispatch(resetForm('createRoomForm'))
      notification('Successfully created room ' + data.room, 'success')
      history.push('/rooms/' + response.room.slug)
    }

    const onError = () => {
      notification('Error creating room ' + room, 'error')
    }

    await dispatch(createRoom(data.room, onSuccess, onError))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm)
