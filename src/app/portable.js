import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import history from './history'
import store from './store'
import Portable from '../pages/Portable'
import { setClientType } from '../actions/client'

store.dispatch(setClientType('portable'))

const target = document.getElementById('chat-root')

const App = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Portable />
    </ConnectedRouter>
  </Provider>
)

render(App, target)
