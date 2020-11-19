import Slot, { ISlotD } from '../../db/slot/slot.model'
import * as mongoose from 'mongoose'
import { redis } from '../../db/database'
import { ISlot, SlotStatus } from '../../interface/slot/slot.interface'
import slotMapModel from '../../db/slotMap/slotMap.model'
import slotModel from '../../db/slot/slot.model'

interface getSlotsArgs {
  bizItemId: string
  slotMapId: string
}

interface getSlotArgs extends getSlotsArgs {
  number: string
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

async function getSlot({ bizItemId, slotMapId, number }: getSlotArgs) {
  try {
    return await slotModel.findOne({ bizItemId, slotMapId, number })
  } catch (err) {
    throw new Error(err)
  }
}

async function getSlots({ bizItemId, slotMapId }: getSlotsArgs) {
  try {
    const field = { bizItemId, slotMapId }
    const slotMap = await slotMapModel.findOne(field).populate('slots')
    return slotMap.slots
  } catch (err) {
    throw new Error(err)
  }
}

async function changeSlotStates({ bizItemId, slotMapId, numbers }) {
  console.log(bizItemId, slotMapId, numbers)
  try {
    const result = await slotModel.updateMany(
      { bizItemId, slotMapId, number: { $in: numbers } },
      { $set: { status: SlotStatus.OCCUPIED } },
    )
    const slots = await getSlots({ bizItemId, slotMapId })
    console.log(await Slot.findOne({ bizItemId, slotMapId, status: SlotStatus.OCCUPIED }))
    console.log(slots)
    return slots
  } catch (err) {
    throw new Error(err)
  }
}

export { createManySlots, getSlots, getSlot, changeSlotStates }
