import { findBizItemById } from '../../controller/bizItem/bizItem.controller'
import { getSlots, getSlot, changeSlotStates } from '../../controller/slot/slot.controller'

const resolvers = {
  Query: {
    slot: (_: unknown, { bizItemId, slotMapId, number }) => {
      try {
        return getSlot({ bizItemId, slotMapId, number })
      } catch (err) {
        throw new Error(err)
      }
    },
    slots: async (_: unknown, { bizItemId, slotMapId }) => {
      try {
        const slots = await getSlots({ bizItemId, slotMapId })
        return slots
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    updateSlots: async (_: unknown, { bizItemId, slotMapId, numbers, status }) => {
      try {
        return await changeSlotStates({ bizItemId, slotMapId, numbers, status })
      } catch (err) {
        throw new Error(err)
      }
    },
    syncSlots: async (_: unknown, { bizItemId, slotMapId }) => {
      try {
        const bizItem = await findBizItemById({ bizItemId })
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

export default resolvers
