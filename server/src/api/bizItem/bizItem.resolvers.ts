import { findBizItemById, getBizItems } from '../../controller/bizItem/bizItem.controller'
import { getBizItemInfo } from '../../util/api'

const resolvers = {
  Query: {
    getListOfBizItems: async (_: unknown) => {
      try {
        const bizItems = await getBizItems()
        return { error: false, bizItems: bizItems }
      } catch (error) {
        return { error: true, errorMessage: '[ERROR] unhandled error occured on server' }
      }
    },
    getBizItemInfo: async (_: unknown, { bizItemId }: { bizItemId: string }) => {
      try {
        const bizItem = await findBizItemById({ bizItemId })
        const bizItemInfo = await getBizItemInfo({ businessId: bizItem.businessId, bizItemId })
        return {
          bizItemInfo,
          error: false,
        }
      } catch (error) {
        return {
          error: true,
          errorMessage: '[ERROR] unhandled error occured on server',
        }
      }
    },
  },
}

export default resolvers
