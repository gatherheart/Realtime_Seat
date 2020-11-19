import { findBizItemById } from '../../controller/bizItem/bizItem.controller'
import { getSlots } from '../../controller/slot/slot.controller'
import { syncSlots } from '../../util/synchronization'

const resolvers = {
  Query: {
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
    syncSlots: async (_: unknown, { bizItemId, slotMapId }) => {
      try {
        const bizItem = await findBizItemById({ bizItemId })
        const slots = await syncSlots({ businessId: bizItem.businessId, bizItemId, slotMapId: slotMapId })
        return slots
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

export default resolvers
