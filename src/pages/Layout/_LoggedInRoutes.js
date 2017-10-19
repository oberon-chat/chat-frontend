import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import ConnectionError from '../../components/ConnectionError'
import Sidebar from './_Sidebar'
import Main from './_Main'
import InvisibleContainer from '../../components/InvisibleContainer'

import Room from '../Room'
import NewRoom from '../Rooms/New'
import SearchRoom from '../Rooms/Search'

class LoggedInRoutes extends Component {
  render () {
    return (
      <InvisibleContainer>
        <ConnectionError />
        <Sidebar />
        <Switch>
          <Route path={'/new-room'} component={NewRoom} />
          <Route path={'/search-rooms'} component={SearchRoom} />
          <Route path={'/rooms/:room/messages/:messageId/edit'} component={Room} />
          <Route path={'/rooms/:room'} component={Room} />
          <Route component={Main} />
        </Switch>
      </InvisibleContainer>
    )
  }
}

export default withRouter(LoggedInRoutes)
