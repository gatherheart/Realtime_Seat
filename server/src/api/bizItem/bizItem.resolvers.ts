import { createBizItem, findBizItemById, getBizItems } from '@controller/bizItem/bizItem.controller'
import { getBizItemDetails } from '@util/api'

const resolvers = {
  Query: {
    bizItems: async (_: unknown) => {
      const bizItems = await getBizItems()
      return bizItems
    },
    bizItemDetails: async (_: unknown, { bizItemId }: { bizItemId: string }) => {
      const bizItem = await findBizItemById({ bizItemId })
      const bizItemDetails = await getBizItemDetails({ businessId: bizItem.businessId, bizItemId })
      return bizItemDetails
    },
    bizItem: async (_: unknown, { bizItemId }: { bizItemId: string }) => {
      const bizItem = await findBizItemById({ bizItemId })
      return bizItem
    },
  },
  Mutation: {
    createBizItem: async (
      _: unknown,
      { bizItemId, businessId, slotMapIds }: { bizItemId: string; businessId: string; slotMapIds: string[] },
    ) => {
      const ret = await createBizItem({ businessId, bizItemId, slotMapIds })
      return ret
    },
  },
}

export default resolvers
