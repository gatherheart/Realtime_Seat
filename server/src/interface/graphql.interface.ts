import { PubSub } from 'graphql-yoga'

interface Payload {
  sub: string
  aud: string
  iat: number
  exp: number
}

export interface IContext {
  pubsub: PubSub
  user: Payload
  error: Error
}
