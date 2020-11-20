import Slot, { ISlotD } from '@db/slot/slot.model'
import { ISlot, SlotStatus } from '@interface/slot/slot.interface'
import slotMapModel from '@db/slotMap/slotMap.model'
import slotModel from '@db/slot/slot.model'
import * as mongodb from 'mongodb'

interface getSlotsArgs {
  bizItemId: string
  slotMapId: string
}

interface getSlotArgs {
  bizItemId: string
  slotMapId: string
  number: string
}

interface changeSlotStatesArgs {
  bizItemId: string
  slotMapId: string
  numbers: string[]
  status: SlotStatus
}

async function createManySlots(
  slotInfos: Array<ISlot>,
  { session }: { session: mongodb.ClientSession },
): Promise<Array<ISlotD>> {
  return Slot.create(slotInfos, { session })
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

async function changeSlotStates({ bizItemId, slotMapId, numbers, status }: changeSlotStatesArgs) {
  try {
    await slotModel.updateMany({ bizItemId, slotMapId, number: { $in: numbers } }, { $set: { status } })
    const slots = await getSlots({ bizItemId, slotMapId })
    return slots
  } catch (err) {
    throw new Error(err)
  }
}

export { createManySlots, getSlots, getSlot, changeSlotStates }
