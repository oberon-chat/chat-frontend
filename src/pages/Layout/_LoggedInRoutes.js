import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { joinUsersChannel } from '../../actions/currentUser'
import ConnectionError from '../../components/ConnectionError'
import Sidebar from './_Sidebar'
import Main from './_Main'
import Room from '../Room'
import InvisibleContainer from '../../components/InvisibleContainer'

class LoggedInRoutes extends Component {
  componentDidMount () {
    this.props.onLogIn()
  }

  render () {
    return (
      <InvisibleContainer>
        <ConnectionError />
        <Sidebar />
        <Switch>
          <Route path={'/rooms/:room/messages/:messageId/edit'} component={Room} />
          <Route path={'/rooms/:room'} component={Room} />
          <Route component={Main} />
        </Switch>
      </InvisibleContainer>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  onLogIn: () => dispatch(joinUsersChannel())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoggedInRoutes))
