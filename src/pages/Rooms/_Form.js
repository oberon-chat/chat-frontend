import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, reset as resetForm } from 'redux-form'
import history from '../../app/history'
import { createRoom } from '../../actions/rooms'
import notification from '../../helpers/notification'
import { Button, Form, Icon, Input, Radio } from 'antd'

const RoomName = (props) => (
  <Input
    placeholder={'Room Name'}
    {...props.input}
  />
)

const RoomType = (props) => {
  const value = props.input.value
  const defaultValue = 'public'
  const passedProps = value ? props.input : {...props.input, value: defaultValue}

  return (
    <Radio.Group {...passedProps}>
      <Radio.Button value='public'>Public</Radio.Button>
      <Radio.Button value='private'>Private</Radio.Button>
    </Radio.Group>
  )
}

export const CreateRoomForm = ({ handleSubmit, pristine, room, submitting }) => (
  <Form layout='inline' onSubmit={handleSubmit}>
    <Form.Item>
      <Field name='name' component={RoomName} />
    </Form.Item>
    <Form.Item>
      <Field name='type' component={RoomType} />
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
      notification('Successfully created room ' + data.name, 'success')
      history.push('/rooms/' + response.room.slug)
    }

    const onError = () => {
      notification('Error creating room ' + room, 'error')
    }

    await dispatch(createRoom(data.name, data.type, onSuccess, onError))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm)
