import * as mongodb from 'mongodb'
import BizItem from '@db/bizItem/bizItem.model'
import { IBizItem } from '@interface/bizItem/bizItem.interface'
import { startSession, Types } from 'mongoose'
import { getSlotInfo } from '@util/api'
import { SlotStatus } from '@interface/slot/slot.interface'
import { createManySlots } from '@controller/slot/slot.controller'
import { ISlotD } from '@db/slot/slot.model'
import slotMapModel from '@db/slotMap/slotMap.model'

interface syncSlotsArgs {
  businessId: string
  bizItemId: string
  slotMapId: string
}

async function createBizItem({ businessId, bizItemId, slotMapIds }: IBizItem) {
  const session: mongodb.ClientSession = await startSession()
  session.startTransaction()
  try {
    const bizItems = await BizItem.create(
      [
        {
          businessId,
          bizItemId,
          slotMapIds,
        },
      ],
      { session },
    )
    for (const slotMapId of slotMapIds) await syncSlots({ businessId, bizItemId, slotMapId }, { session })
    await session.commitTransaction()
    session.endSession()
    return bizItems
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    throw err
  }
}

function findBizItemById({ bizItemId }: { bizItemId: string }): Promise<IBizItem> {
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

// utils for Synchronization with booking-web server
const syncSlots = async (
  { businessId, bizItemId, slotMapId }: syncSlotsArgs,
  { session }: { session: mongodb.ClientSession },
) => {
  try {
    const slotInfo = await getSlotInfo({ businessId, bizItemId, slotMapId })
    const seats = []

    slotInfo.seatGroups.forEach((seatGroup) => {
      seatGroup?.seats?.forEach((seat) =>
        seats.push({
          bizItemId: bizItemId,
          slotMapId: slotMapId,
          number: seat.number,
          state: SlotStatus.FREE,
          view: seat.view,
          typeName: seatGroup.typeName,
        }),
      )
    })
    const createdSeats: ISlotD[] = await createManySlots(seats, { session })
    const slots: Types.ObjectId[] = createdSeats.map((c) => c.id as Types.ObjectId)
    await slotMapModel.create(
      [
        {
          bizItemId: bizItemId,
          slotMapId: slotMapId,
          slots: slots,
        },
      ],
      { session },
    )
    return createdSeats
  } catch (err) {
    throw new Error(err)
  }
}

export { createBizItem, findBizItemById, getBizItems }
