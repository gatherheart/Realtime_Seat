import { CreateQuery } from 'mongoose'
import BizItem, { IBizItem } from '../../db/bizItem/bizItem.model'

function createBizItem({ businessId, bizItemId, slotMapId }: CreateQuery<IBizItem>): Promise<IBizItem> {
  return BizItem.create({
    businessId,
    bizItemId,
    slotMapId,
  })
    .then((data: IBizItem) => {
      return data
    })
    .catch((error: Error) => {
      throw error
    })
}

function findBizItemById({ bizItemId }: CreateQuery<{ bizItemId: string }>): Promise<IBizItem> {
  return new Promise<IBizItem>((resolve, reject) => {
    BizItem.findOne({
      bizItemId,
    })
      .then((found: IBizItem) => {
        resolve(found)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

function getBizItems(): Promise<Array<IBizItem>> {
  return new Promise<Array<IBizItem>>((resolve, reject) => {
    BizItem.find({})
      .limit(10)
      .then((found: Array<IBizItem>) => {
        resolve(found)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

export { createBizItem, findBizItemById, getBizItems }
