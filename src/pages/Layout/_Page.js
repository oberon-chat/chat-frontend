import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSocket } from '../../actions/socket'
import { joinRoomsChannel } from '../../actions/rooms'
import { joinSupportRoomsChannel } from '../../actions/supportRooms'
import { joinUsersChannel } from '../../actions/users'
import { getIsLoggedIn } from '../../reducers/currentUser'
import { getIsConnected } from '../../reducers/socket'
import parallel from '../../helpers/parallel'
import { Layout } from 'antd'

class Page extends Component {
  componentWillMount () {
    if (this.props.isLoggedIn) {
      this.props.handleLogin()
    }
  }

  componentWillReceiveProps (next) {
    const isReconnect = (this.props.isConnected === false && next.isConnected === true)

    if (!this.props.isLoggedIn && next.isLoggedIn) {
      this.props.handleLogin()
    }

    if (next.isLoggedIn && isReconnect) {
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
  isConnected: getIsConnected(state),
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
