import { Component } from 'react'
import PropTypes from 'prop-types'
import { clients } from '../app/graphql'

class ApolloClient extends Component {
  static childContextTypes = {
    client: PropTypes.object.isRequired
  }

  getChildContext () {
    const key = this.props.client
    const client = clients[key]

    return { client: client }
  }

  render () {
    return this.props.children
  }
}

export default ApolloClient
