import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import history from './history'
import store from './store'
import Layout from '../pages/Layout'
import registerServiceWorker from './registerServiceWorker'
import clearExpiredSessions from './clearExpiredSessions'
import { setClientType } from '../actions/client'

store.dispatch(setClientType('web'))

const target = document.getElementById('chat-root')

const App = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout />
    </ConnectedRouter>
  </Provider>
)

render(App, target)
registerServiceWorker()
clearExpiredSessions()
