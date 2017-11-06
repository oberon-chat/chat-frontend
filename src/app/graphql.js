import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { getToken } from '../helpers/token'
import { map } from 'lodash'

const createApolloClient = (uri) => {
  const networkInterface = createNetworkInterface({
    uri: uri
  })

  const requestHeaders = {
    applyMiddleware (req, next) {
      const token = getToken()

      if (!req.options.headers) { req.options.headers = {} }
      req.options.headers.authorization = token ? `Bearer ${token}` : null
      next()
    }
  }

  networkInterface.use([requestHeaders])

  const client = new ApolloClient({
    networkInterface
  })

  return client
}

export const clients = {
  oauth2: createApolloClient(process.env.REACT_APP_SERVER_OAUTH2_ADDRESS)
}

export const resetStore = (key) => clients[key].resetStore()

export const resetAllStores = () => map(clients, (client) => client.resetStore())
