import { PubSub } from 'graphql-yoga'
import { verify } from 'jsonwebtoken'

const pubsub = new PubSub()

export default function (context) {
  const JWT_SECRET = process.env.JWT_SECRET || 'SECRET'
  const token =
    context.request?.headers.authorization?.split(' ')[1] || context.connection?.context.Authorization?.split(' ')[1]

  verify(token, JWT_SECRET, (err, decoded = null) => {
    context.error = err
    context.user = decoded
  })
  context.pubsub = pubsub
  return context
}
