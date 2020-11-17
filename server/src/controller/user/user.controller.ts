import User, { IUser } from '../../db/user/user.model'
import { CreateQuery } from 'mongoose'
import { redis } from '../../db/database'

async function createUser({ uid, email, userName }: CreateQuery<IUser>): Promise<IUser> {
  return User.create({
    uid,
    email,
    userName,
  })
    .then((data: IUser) => {
      return data
    })
    .catch((error: Error) => {
      throw error
    })
}

function findUserById({ uid }: CreateQuery<{ uid: string }>): Promise<IUser> {
  return new Promise<IUser>((resolve, reject) => {
    redis.get(uid, (err, reply) => {
      if (err) {
        return reject(err)
      } else if (reply) {
        const foundUser: IUser = JSON.parse(reply) as IUser
        resolve(foundUser)
      } else {
        User.findOne({
          uid,
        })
          .then((foundUser: IUser) => {
            redis.set(foundUser.uid, JSON.stringify(foundUser))
            resolve(foundUser)
          })
          .catch((error: Error) => {
            throw error
          })
      }
    })
  })
}

export { createUser, findUserById }
