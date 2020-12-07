import { PubSub } from 'graphql-yoga'

export interface JWTPayload {
  sub?: string
  aud: string
  iat?: number
  exp?: number
}

export interface IContext {
  pubsub: PubSub
  user: JWTPayload
  error: Error
}
