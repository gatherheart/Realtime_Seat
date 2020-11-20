import { split, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

const httpUri = process.env.REACT_APP_HTTP_URI || 'localhost'
const httpPort = process.env.REACT_APP_HTTP_PORT || 4000
const wsUri = process.env.REACT_APP_WS_URI || 'localhost'
const wsPort = process.env.REACT_APP_WS_PORT || 4000

const httpLink = new HttpLink({
  uri: `http://${httpUri}:${httpPort}`,
})

const wsLink = new WebSocketLink({
  uri: `ws://${wsUri}:${wsPort}`,
  options: {
    reconnect: true,
  },
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink,
)

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
