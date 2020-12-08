import { resolve } from 'path'
import { config } from 'dotenv'
import { GraphQLServer } from 'graphql-yoga'
import schema from './schema'
import { connect } from './db/database'
import * as logger from 'morgan'
import contextMiddleware from './contextMiddleware'

config({ path: resolve(__dirname, '../.env') })
const PORT = process.env.PORT || 4000
const server = new GraphQLServer({
  schema,
  context: contextMiddleware,
})
const options = {
  port: PORT,
}

// Connect to DB
connect()
// Server Start
void server.start(options, () => console.log(`Server is running on http://localhost:${PORT}`))
server.express.use(logger('dev'))
