import { makeExecutableSchema } from 'graphql-tools'
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import * as path from 'path'

const allTypes = fileLoader(path.join(__dirname, '/api/**/*.graphql'))
const allResolvers = fileLoader(path.join(__dirname, '/api/**/*.resolvers.*'))
const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  resolvers: mergeResolvers(allResolvers),
})

export default schema
