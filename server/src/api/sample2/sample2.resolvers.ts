import { getSlots } from '../../controller/slot/slot.controller'
import { Types } from 'mongoose'
import { ISlot } from '../../interface/slot/slot.interface'

const resolvers = {
  Query: {
    sample2: async (_: unknown, { bizItemId, slotMapId }) => {
      const foundSlot = await getSlots({ bizItemId, slotMapId })
      if (foundSlot) return foundSlot
      else throw new Error('Not Found')
    },
  },
  Mutation: {
    sample2: async (_: unknown, { slotId, view, typeName }) => {
      try {
        return 'Hello World'
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

export default resolvers
