import { sign } from 'jsonwebtoken'

let guestId = 0

const resolvers = {
  Query: {
    token: () => {
      const JWT_SECRET = process.env.JWT_SECRET ?? 'SECRET'
      const payload = {
        sub: 'realtime-seat guest token',
        aud: 'guest' + guestId,
      }
      guestId += 1
      return sign(payload, JWT_SECRET, { expiresIn: '1h' })
    },
  },
}

export default resolvers
