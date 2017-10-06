import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { isLoggedIn } from '../../reducers/currentUser'
import ErrorHandler from '../../components/ErrorHandler'
import FlashMessages from '../../components/FlashMessages'
import DraggableBanner from './_DraggableBanner'
import Page from './_Page'
import LoggedInRoutes from './_LoggedInRoutes'
import Login from '../Login'
import '../../static/antd.css'
import '../../static/common.css'
import '../../static/ui.css'

export const Layout = ({ loggedIn }) => {
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
        { loggedIn ? <LoggedInRoutes /> : loggedOutRoutes }
      </ErrorHandler>
    </Page>
  )
}

Layout.displayName = 'Layout'

const mapStateToProps = (state) => ({
  loggedIn: isLoggedIn(state)
})

export default withRouter(connect(mapStateToProps)(Layout))
