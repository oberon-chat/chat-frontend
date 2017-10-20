import React from 'react'
import { connect } from 'react-redux'
import { sortBy } from 'lodash'
import { getFormValues, Field, reduxForm, reset as resetForm } from 'redux-form'
import history from '../../app/history'
import { createDirectMessage } from '../../actions/directMessages'
import { getUsers } from '../../reducers/users'
import notification from '../../helpers/notification'
import { searchUsers } from '../../helpers/search'
import Content from '../Layout/_Content'
import Header from '../Layout/_Header'
import Main from '../Layout/_Main'
import UsersList from './_List'
import { Form, Input } from 'antd'

const SearchInput = (props) => (
  <Input.Search
    placeholder={'Search for user'}
    {...props.input}
  />
)

const NewDirectMessage = ({ handleCreate, matches }) => (
  <Main>
    <Header>
      <h2>New Direct Message</h2>
    </Header>
    <Content classes='padded'>
      <div className='chat-search'>
        <Form layout='inline'>
          <Form.Item>
            <Field name='search' component={SearchInput} />
          </Form.Item>
        </Form>
        <UsersList onCreate={handleCreate} users={matches} />
      </div>
    </Content>
  </Main>
)

const ReduxForm = reduxForm()(NewDirectMessage)

const mapStateToProps = (state) => {
  const form = 'searchDirectMessagesForm'
  const formData = getFormValues(form)(state) || {}
  const users = getUsers(state)
  const sorted = sortBy(users, 'name')
  const matches = searchUsers(sorted, formData.search)

  return {
    form: form,
    matches: matches
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClear: () => dispatch(resetForm('searchDirectMessagesForm')),
  handleCreate: async (otherUserId) => {
    const onSuccess = (response) => {
      dispatch(resetForm('searchDirectMessagesForm'))
      history.push('/rooms/' + response.room.slug)
    }

    const onError = () => {
      notification('Error creating direct message', 'error')
    }

    await dispatch(createDirectMessage(otherUserId, onSuccess, onError))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm)
