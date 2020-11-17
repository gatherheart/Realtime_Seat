import GraphQLJSON from 'graphql-type-json'

const resolvers = {
  JSON: {
    __serialize(value: unknown): unknown {
      return GraphQLJSON.parseValue(value)
    },
  },
}

export default resolvers
