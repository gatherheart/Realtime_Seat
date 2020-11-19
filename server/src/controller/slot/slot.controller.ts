import Slot, { ISlotD } from '../../db/slot/slot.model'
import * as mongoose from 'mongoose'
import { redis } from '../../db/database'
import { ISlot } from '../../interface/slot/slot.interface'
import slotMapModel from '../../db/slotMap/slotMap.model'
interface findSlotsArgs {
  bizItemId: string
  slotMapId: string
}

function createManySlots(slotInfos: Array<ISlot>): Promise<Array<ISlotD>> {
  return Slot.insertMany(slotInfos)
    .then((data: Array<ISlotD>) => {
      return data
    })
    .catch((error: Error) => {
      throw error
    })
}

async function getSlots({ bizItemId, slotMapId }: findSlotsArgs) {
  try {
    const field = { bizItemId, slotMapId }
    const slotMap = await slotMapModel.findOne(field).populate('slots')
    return slotMap.slots
  } catch (err) {
    throw new Error(err)
  }
}

export { createManySlots, getSlots }
