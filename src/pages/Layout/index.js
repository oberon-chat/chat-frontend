import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { getIsLoggedIn } from '../../reducers/currentUser'
import ErrorHandler from '../../components/ErrorHandler'
import FlashMessages from '../../components/FlashMessages'
import DraggableBanner from './_DraggableBanner'
import Page from './_Page'
import LoggedInRoutes from './_LoggedInRoutes'
import Login from '../Login'
import '../../static/antd.css'
import '../../static/common.css'
import '../../static/ui.css'

export const Layout = ({ isLoggedIn }) => {
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
        { isLoggedIn ? <LoggedInRoutes /> : loggedOutRoutes }
      </ErrorHandler>
    </Page>
  )
}

Layout.displayName = 'Layout'

const mapStateToProps = (state) => ({
  isLoggedIn: getIsLoggedIn(state)
})

export default withRouter(connect(mapStateToProps)(Layout))
