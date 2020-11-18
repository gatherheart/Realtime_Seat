import { createSlot, findSlotById } from '../../controller/slot/slot.controller'
import { ISlot } from '../../interface/slot/slot.interface'

const resolvers = {
  Query: {
    sample2: async (_: unknown, { slotId }) => {
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
