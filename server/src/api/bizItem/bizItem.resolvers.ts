import { createBizItem, findBizItemById, getBizItems } from '../../controller/bizItem/bizItem.controller'
import { getBizItemInfo } from '../../util/api'

const resolvers = {
  Query: {
    bizItems: async (_: unknown) => {
      try {
        const bizItems = await getBizItems()
        return bizItems
      } catch (err) {
        throw new Error(err)
      }
    },
    bizItemInfo: async (_: unknown, { bizItemId }: { bizItemId: string }) => {
      try {
        const bizItem = await findBizItemById({ bizItemId })
        const bizItemInfo = await getBizItemInfo({ businessId: bizItem.businessId, bizItemId })
        return bizItemInfo
      } catch (err) {
        throw new Error(err)
      }
    },
    bizItem: async (_: unknown, { bizItemId }: { bizItemId: string }) => {
      try {
        const bizItem = await findBizItemById({ bizItemId })
        return bizItem
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    createBizItem: async (
      _: unknown,
      { bizItemId, businessId, slotMapIds }: { bizItemId: string; businessId: string; slotMapIds: string[] },
    ) => {
      try {
        const ret = await createBizItem({ businessId, bizItemId, slotMapIds })
        return ret
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

export default resolvers
