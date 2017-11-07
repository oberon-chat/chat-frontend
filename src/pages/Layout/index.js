import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { getIsLoggedIn } from '../../reducers/currentUser'
import ConnectionError from '../../components/ConnectionError'
import ErrorHandler from '../../components/ErrorHandler'
import FlashMessages from '../../components/FlashMessages'
import InvisibleContainer from '../../components/InvisibleContainer'
import DraggableBanner from './_DraggableBanner'
import Page from './_Page'
import Sidebar from './_Sidebar'
import '../../static/antd.css'
import '../../static/common.css'
import '../../static/ui.css'

import Login from '../Login'
import Main from './_Main'
import NewDirectMessage from '../DirectMessages/New'
import NewRoom from '../Rooms/New'
import Rooms from '../Rooms'
import SearchRoom from '../Rooms/Search'

export const Layout = ({ isLoggedIn }) => {
  const loggedInRoutes = (
    <InvisibleContainer>
      <ConnectionError />
      <Sidebar />
      <Switch>
        <Route path={'/new-direct-message'} component={NewDirectMessage} />
        <Route path={'/new-room'} component={NewRoom} />
        <Route path={'/search-rooms'} component={SearchRoom} />
        <Route path={'/rooms/:roomId/messages/:messageId/edit'} component={Rooms} />
        <Route path={'/rooms/:roomId'} component={Rooms} />
        <Route component={Main} />
      </Switch>
    </InvisibleContainer>
  )

  const loggedOutRoutes = (
    <Switch>
      <Route component={Login} />
    </Switch>
  )

  return (
    <Page>
      <DraggableBanner />
      <FlashMessages />
      <ErrorHandler>
        { isLoggedIn ? loggedInRoutes : loggedOutRoutes }
      </ErrorHandler>
    </Page>
  )
}

Layout.displayName = 'Layout'

const mapStateToProps = (state) => ({
  isLoggedIn: getIsLoggedIn(state)
})

export default withRouter(connect(mapStateToProps)(Layout))
