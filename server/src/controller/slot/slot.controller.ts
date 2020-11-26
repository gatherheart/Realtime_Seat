import * as mongodb from 'mongodb'
import Slot, { ISlotD } from '@db/slot/slot.model'
import { ISlot, SlotStatus, SlotChanges } from '@interface/slot/slot.interface'
import slotMapModel from '@db/slotMap/slotMap.model'
import slotModel from '@db/slot/slot.model'
import { ISlotMap } from '@interface/slotMapId/slotMap.interface'

interface GetSlotsArgs {
  bizItemId: string
  slotMapId: string
}

interface GetSlotArgs {
  bizItemId: string
  slotMapId: string
  number: string
}

interface UpdateSlotOneArgs {
  bizItemId: string
  slotMapId: string
  number: string
  status: SlotStatus
}

interface UpdateSlotManyArgs {
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

async function getSlot({ bizItemId, slotMapId, number }: GetSlotArgs) {
  return await slotModel.findOne({ bizItemId, slotMapId, number })
}

async function getSlots({ bizItemId, slotMapId }: GetSlotsArgs): Promise<ISlot[]> {
  const field = { bizItemId, slotMapId }
  const slotMap: ISlotMap = await slotMapModel.findOne(field).populate('slots')
  return slotMap?.slots as ISlot[]
}

async function updateSlotOne({ bizItemId, slotMapId, number, status }: UpdateSlotOneArgs): Promise<SlotChanges> {
  let stateCond: SlotStatus
  switch (status) {
    case SlotStatus.OCCUPIED:
      stateCond = SlotStatus.FREE
      break
    case SlotStatus.FREE:
      stateCond = SlotStatus.OCCUPIED
      break
    default:
      break
  }
  const foundSlot: ISlot = await slotModel.findOneAndUpdate(
    { bizItemId, slotMapId, number, status: stateCond },
    { status },
  )
  return { slots: [foundSlot], status, success: true }
}

async function updateSlotsMany({ bizItemId, slotMapId, numbers, status }: UpdateSlotManyArgs): Promise<SlotChanges> {
  const foundSlots = await slotModel.find({ bizItemId, slotMapId, number: { $in: numbers } })
  const foundStatuses: SlotStatus[] = foundSlots.map((slot) => slot.status)
  switch (status) {
    case SlotStatus.OCCUPIED:
      if (!foundStatuses.includes(SlotStatus.FREE)) return { slots: [], status, success: false }
      break
    // to-do: check user session ID to check who has made this occupation
    case SlotStatus.SOLD:
      if (!foundStatuses.includes(SlotStatus.OCCUPIED)) return { slots: [], status, success: false }
      break
    default:
      break
  }
  await slotModel.updateMany({ bizItemId, slotMapId, number: { $in: numbers } }, { $set: { status } })
  return { slots: foundSlots, status, success: true }
}

export { createManySlots, getSlots, getSlot, updateSlotOne, updateSlotsMany }
