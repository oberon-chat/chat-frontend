import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSocket } from '../../actions/socket'
import { getIsLoggedIn } from '../../reducers/currentUser'
import { joinRoomsChannel } from '../../actions/rooms'
import { joinSupportRoomsChannel } from '../../actions/supportRooms'
import { joinUsersChannel } from '../../actions/users'
import parallel from '../../helpers/parallel'
import { Layout } from 'antd'

class Page extends Component {
  componentWillMount () {
    if (this.props.isLoggedIn) {
      this.props.handleLogin()
    }
  }

  render () {
    const { children } = this.props

    return (
      <Layout className='theme-light window-height window-width'>
        { children }
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: getIsLoggedIn(state)
})

const mapDispatchToProps = (dispatch) => ({
  handleLogin: () => {
    const onSuccess = async () => {
      await parallel([
        dispatch(joinRoomsChannel()),
        dispatch(joinSupportRoomsChannel()),
        dispatch(joinUsersChannel())
      ])
    }

    return dispatch(fetchSocket(onSuccess))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)
