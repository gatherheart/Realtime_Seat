import { createUser, findUserById } from '../../controller/user/user.controller'
import { IUser } from '../../db/user/user.model'
import { MutationSample2Args, QuerySample2Args, Sample2Response } from '../../types'

const resolvers = {
  Query: {
    sample2: async (_: unknown, { uid }: QuerySample2Args): Promise<Sample2Response> => {
      const foundUser: IUser = await findUserById({ uid })
      if (foundUser) return { error: false, user: foundUser }
      else return { error: true, errorMessage: 'Not Found User' }
    },
  },
  Mutation: {
    sample2: async (_: unknown, { uid, userName, email }: MutationSample2Args): Promise<Sample2Response> => {
      try {
        const createdUser: IUser = await createUser({ uid, userName, email })
        void createdUser.save()
        return { error: false, user: createdUser }
      } catch (err) {
        return { error: true, errorMessage: 'Already Existing uid or userName' }
      }
    },
  },
}

export default resolvers
