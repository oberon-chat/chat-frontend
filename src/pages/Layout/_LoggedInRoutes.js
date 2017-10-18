import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import ConnectionError from '../../components/ConnectionError'
import Sidebar from './_Sidebar'
import Main from './_Main'
import InvisibleContainer from '../../components/InvisibleContainer'

import Room from '../Room'
import NewRoom from '../Rooms/New'

class LoggedInRoutes extends Component {
  render () {
    return (
      <InvisibleContainer>
        <ConnectionError />
        <Sidebar />
        <Switch>
          <Route path={'/rooms/new'} component={NewRoom} />
          <Route path={'/rooms/:room/messages/:messageId/edit'} component={Room} />
          <Route path={'/rooms/:room'} component={Room} />
          <Route component={Main} />
        </Switch>
      </InvisibleContainer>
    )
  }
}

export default withRouter(LoggedInRoutes)
