import * as Mongoose from 'mongoose'
import * as Redis from 'redis'

const redisClient = Redis.createClient
export const redis = redisClient(6379, 'localhost')

let database: Mongoose.Connection
export const connect = (): void => {
  const uri = process.env.MONGO_URI
  console.log(uri)
  if (database) {
    return
  }
  void Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  database = Mongoose.connection
  database.once('open', () => {
    console.log('Connected to database')
  })
  database.on('error', () => {
    console.log('Error connecting to database')
  })
  redis.on('connect', () => {
    console.log('connected to Redis')
  })
}
export const disconnect = (): void => {
  if (!database) {
    return
  }
  void Mongoose.disconnect()
}
