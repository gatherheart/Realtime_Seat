import { RESPONSE_CODE } from '../../constant/errorCode'
import { findBizItemById } from '../../controller/bizItem/bizItem.controller'
import { getSlotsBySlotMapId } from '../../controller/slot/slot.controller'
import { syncSlots } from '../../util/synchronization'

const resolvers = {
  Query: {
    slots: async (_: unknown, { slotMapId }) => {
      try {
        const slots = await getSlotsBySlotMapId(slotMapId)
        return { slots, error: false }
      } catch (err) {
        return { error: true, errorMessage: RESPONSE_CODE.INTERNAL_SERVER_ERROR }
      }
    },
  },
  Mutation: {
    synchronizationForSlot: async (_: unknown, { bizItemId, slotMapId }) => {
      try {
        const bizItem = await findBizItemById({ bizItemId })
        const slots = await syncSlots({ businessId: bizItem.businessId, bizItemId, slotMapId: slotMapId })
        return { slots, error: false }
      } catch (err) {
        return { error: true, errorMessage: RESPONSE_CODE.INTERNAL_SERVER_ERROR }
      }
    },
  },
}

export default resolvers
