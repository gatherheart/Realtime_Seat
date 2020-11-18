import { findBizItemById, getBizItems } from '../../controller/bizItem/bizItem.controller'
import { getBizItemInfo } from '../../util/api'

const resolvers = {
  Query: {
    getListOfBizItems: async (_: unknown) => {
      try {
        const bizItems = await getBizItems()
        return bizItems
      } catch (err) {
        throw new Error(err)
      }
    },
    getBizItemInfo: async (_: unknown, { bizItemId }: { bizItemId: string }) => {
      try {
        const bizItem = await findBizItemById({ bizItemId })
        const bizItemInfo = await getBizItemInfo({ businessId: bizItem.businessId, bizItemId })
        return bizItemInfo
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

export default resolvers
