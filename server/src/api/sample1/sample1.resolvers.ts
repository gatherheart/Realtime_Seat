import { IContext } from '../../interface/graphql.interface'

const resolvers = {
  Query: {
    sample1: (_: unknown, args) => {
      return `Hello ${args.name}`
    },
  },

  Mutation: {
    sample1: (_: unknown, { channel, text }, { pubsub }: IContext) => {
      const message = { channel, text }
      pubsub.publish(channel, { sample1: message })
      return message
    },
  },

  Subscription: {
    sample1: {
      subscribe: (_: unknown, { channel }, { pubsub }: IContext) => {
        return pubsub.asyncIterator(channel)
      },
    },
  },
}

export default resolvers
