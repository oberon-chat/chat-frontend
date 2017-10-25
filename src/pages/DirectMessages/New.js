import React from 'react'
import { connect } from 'react-redux'
import { difference, forEach, isEmpty, map, reduce, reject, sortBy } from 'lodash'
import { getFormValues, Field, reduxForm, reset as resetForm } from 'redux-form'
import history from '../../app/history'
import { createDirectMessage } from '../../actions/directMessages'
import { updateSubscription } from '../../actions/userSubscriptions'
import { getCurrentUser } from '../../reducers/currentUser'
import { getRoomUserIds } from '../../reducers/roomSubscriptions'
import { getUsers } from '../../reducers/users'
import { getRoomsByType } from '../../reducers/userSubscriptions'
import notification from '../../helpers/notification'
import { roomPath } from '../../helpers/paths'
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

const NewDirectMessage = ({ findDirectMessage, handleCreate, handleOpen, matches }) => {
  const handleClick = (user) => {
    const room = findDirectMessage(user)

    return room ? handleOpen(room) : handleCreate(user)
  }

  return (
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
          <UsersList handleClick={handleClick} users={matches} />
        </div>
      </Content>
    </Main>
  )
}

const ReduxForm = reduxForm()(NewDirectMessage)

const mapStateToProps = (state) => {
  const currentUser = getCurrentUser(state)
  const form = 'searchDirectMessagesForm'
  const formData = getFormValues(form)(state) || {}

  // User list data
  const users = getUsers(state)
  const sorted = sortBy(users, 'name')
  const omitted = reject(sorted, (user) => user.id === currentUser.id)
  const matches = searchUsers(omitted, formData.search)

  // Direct message data
  const directMessageSlugs = map(getRoomsByType(state, 'direct'), 'slug')
  const directMessageUserIds = reduce(directMessageSlugs, (acc, slug) => {
    acc[slug] = getRoomUserIds(state, slug)

    return acc
  }, {})

  const findDirectMessageSlugByExactSubscribers = (otherUser) => {
    const matchIds = [currentUser.id, otherUser.id]

    let match

    forEach(directMessageUserIds, (userIds, slug) => {
      if (isEmpty(difference(matchIds, userIds))) {
        match = slug

        return true
      }
    })

    return match
  }

  return {
    findDirectMessage: findDirectMessageSlugByExactSubscribers,
    form: form,
    matches: matches
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClear: () => dispatch(resetForm('searchDirectMessagesForm')),
  handleCreate: async (user) => {
    const onSuccess = (response) => {
      dispatch(resetForm('searchDirectMessagesForm'))
      history.push('/rooms/' + response.room.slug)
    }

    const onError = () => {
      notification('Error creating direct message', 'error')
    }

    await dispatch(createDirectMessage(user.id, onSuccess, onError))
  },
  handleOpen: (roomSlug) => {
    dispatch(updateSubscription(roomSlug, {state: 'open'}))
    history.push(roomPath(roomSlug))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm)
