import { createSlot, findSlotById } from '../../controller/slot/slot.controller'
import { createBizItem } from '../../controller/bizItem/bizItem.controller'
import { ISlot } from '../../db/slot/slot.model'
import { MutationSample2Args, QuerySample2Args, Sample2Response } from '../../types'
import { IBizItem } from '../../db/bizItem/bizItem.model'

const resolvers = {
  Query: {
    sample2: async (_: unknown, { slotId }: QuerySample2Args) => {
      const foundSlot: ISlot = await findSlotById({ slotId })
      if (foundSlot) return { error: false, slot: foundSlot }
      else return { error: true, errorMessage: 'Not Found User' }
    },
  },
  Mutation: {
    sample2: async (_: unknown, { slotId, view, typeName }) => {
      try {
        const createdSlot: ISlot = await createSlot({ slotId, view, typeName })
        return { error: false, slot: createdSlot }
      } catch (err) {
        return { error: true, errorMessage: 'Already Existing uid or userName' }
      }
    },
  },
}

export default resolvers
