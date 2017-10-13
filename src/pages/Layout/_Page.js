import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSocket } from '../../actions/socket'
import { getIsLoggedIn } from '../../reducers/currentUser'
import { Layout } from 'antd'

class Page extends Component {
  componentWillMount () {
    if (this.props.isLoggedIn) {
      this.props.withLogin()
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
  withLogin: () => dispatch(fetchSocket())
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)
