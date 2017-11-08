import React from 'react'
import { connect } from 'react-redux'
import { sortBy, values } from 'lodash'
import { Link } from 'react-router-dom'
import { getFormValues, Field, reduxForm, reset as resetForm } from 'redux-form'
import { getPublicRooms } from '../../reducers/publicRooms'
import { getSupportRooms } from '../../reducers/supportRooms'
import { newRoomPath } from '../../helpers/paths'
import { searchRooms } from '../../helpers/search'
import Content from '../Layout/_Content'
import Header from '../Layout/_Header'
import Main from '../Layout/_Main'
import RoomsList from './_List'
import { Form, Input } from 'antd'

const SearchInput = (props) => (
  <Input.Search
    placeholder={'Search for room'}
    {...props.input}
  />
)

const SearchRooms = ({ matches }) => (
  <Main>
    <Header>
      <h2>Rooms</h2>
    </Header>
    <Content classes='padded'>
      <div className='chat-search'>
        <Form layout='inline'>
          <p>{matches.length} Rooms</p>
          <Form.Item>
            <Field name='search' component={SearchInput} />
          </Form.Item>
          <span>
            Or create a {' '} <Link to={newRoomPath}>new room</Link>
          </span>
        </Form>
        <RoomsList rooms={matches} />
      </div>
    </Content>
  </Main>
)

const ReduxForm = reduxForm()(SearchRooms)

const mapStateToProps = (state) => {
  const form = 'searchRoomsForm'
  const formData = getFormValues(form)(state) || {}
  const publicRooms = values(getPublicRooms(state))
  const supportRooms = getSupportRooms(state)
  const rooms = sortBy(publicRooms.concat(supportRooms), 'slug')
  const matches = searchRooms(rooms, formData.search)

  return {
    form: form,
    matches: matches
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClear: () => dispatch(resetForm('searchRoomsForm'))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm)
