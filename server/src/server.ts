import { resolve } from 'path'
import { config } from 'dotenv'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import schema from './schema'
import { connect } from './db/database'
import * as logger from 'morgan'

config({ path: resolve(__dirname, '../.env') })
const PORT = process.env.PORT || 4000

const pubsub = new PubSub()
const server = new GraphQLServer({ schema, context: { pubsub } })

// Connect to DB
connect()
// Server Start
void server.start({ port: PORT }, () => console.log(`Server is running on http://localhost:${PORT}`))
server.express.use(logger('dev'))
