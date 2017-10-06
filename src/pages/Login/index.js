import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout as LayoutComponent } from 'antd'
import DraggableBanner from '../Layout/_DraggableBanner'
import ApolloClient from '../../components/ApolloClient'
import FlashMessages from '../../components/FlashMessages'

import LoginPage from './Login'
import LoginCallback from './Callback'

const Login = () => (
  <LayoutComponent className='window-height window-width'>
    <DraggableBanner />
    <FlashMessages />
    <ApolloClient client='oauth2'>
      <Switch>
        <Route path='/login/:provider/callback' component={LoginCallback} />
        <Route component={LoginPage} />
      </Switch>
    </ApolloClient>
  </LayoutComponent>
)

Login.displayName = 'Login'

export default Login
