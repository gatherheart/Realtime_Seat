import { createSlot, findSlotById } from '../../controller/slot/slot.controller'
import { ISlot, SlotStatus } from '../../interface/slot/slot.interface'

const resolvers = {
  Query: {
    sample2: async (_: unknown, { slotId }) => {
      const foundSlot: ISlot = await findSlotById({ slotId })
      if (foundSlot) return foundSlot
      else throw new Error('Not Found')
    },
  },
  Mutation: {
    sample2: async (_: unknown, { slotId, view, typeName }) => {
      try {
        const createdSlot: ISlot = await createSlot({ slotId, view, typeName, status: SlotStatus.FREE })
        return createdSlot
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

export default resolvers
