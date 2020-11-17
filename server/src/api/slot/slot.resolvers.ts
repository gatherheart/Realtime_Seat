import { findBizItemById } from '../../controller/bizItem/bizItem.controller'
import { syncSlots } from '../../util/sync'

const resolvers = {
  Mutation: {
    synchronizationForSlot: async (_: unknown, { bizItemId, slotMapId }) => {
      const bizItem = await findBizItemById({ bizItemId })
      try {
        await syncSlots({ businessId: bizItem.businessId, bizItemId, slotMapId: slotMapId })
        return true
      } catch (err) {
        return false
      }
    },
  },
}

export default resolvers
