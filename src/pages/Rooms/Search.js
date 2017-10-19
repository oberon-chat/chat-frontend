import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sortBy, values } from 'lodash'
import { getFormValues, Field, reduxForm, reset as resetForm } from 'redux-form'
import { fetchPublicRooms } from '../../actions/publicRooms'
import { getPublicRooms } from '../../reducers/publicRooms'
import { getSupportRooms } from '../../reducers/supportRooms'
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

class SearchRooms extends Component {
  componentDidMount () {
    this.props.handleLoad()
  }

  render() {
    const { matches } = this.props

    return (
      <Main>
        <Header>
          <h2>Rooms</h2>
        </Header>
        <Content classes='padded'>
          <div className='chat-search-rooms'>
            <Form layout='inline'>
              <p>{matches.length} Rooms</p>
              <Form.Item>
                <Field name='search' component={SearchInput} />
              </Form.Item>
            </Form>
            <RoomsList rooms={matches} />
          </div>
        </Content>
      </Main>
    )
  }
}

const ReduxForm = reduxForm()(SearchRooms)

const mapStateToProps = (state) => {
  const publicRooms = values(getPublicRooms(state))
  const supportRooms = getSupportRooms(state)
  const rooms = sortBy(publicRooms.concat(supportRooms), 'slug')
  const form = 'searchRoomsForm'
  const formData = getFormValues(form)(state) || {}
  const matches = searchRooms(rooms, formData.search)

  return {
    form: form,
    matches: matches
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClear: () => dispatch(resetForm('createRoomForm')),
  handleLoad: () => true //dispatch(fetchPublicRooms())
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm)
