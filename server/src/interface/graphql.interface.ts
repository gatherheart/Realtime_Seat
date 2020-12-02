import { PubSub } from 'graphql-yoga'

export interface IContext {
  pubsub: PubSub
  user: string | object
  error: Error
}
