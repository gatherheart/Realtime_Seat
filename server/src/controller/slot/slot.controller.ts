import * as mongodb from 'mongodb'
import Slot, { ISlotD } from '@db/slot/slot.model'
import { ISlot, SlotStatus, SlotChanges } from '@interface/slot/slot.interface'
import { JWTPayload } from '@interface/graphql.interface'
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
  verified?: boolean
}

interface UpdateSlotsArgs {
  bizItemId: string
  slotMapId: string
  numbers: string[]
  user: JWTPayload
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

async function updateSlotsFree({ bizItemId, slotMapId, numbers, user }: UpdateSlotsArgs): Promise<SlotChanges> {
  try {
    if (!user) throw new Error()

    const foundSlots = await slotModel.find({ bizItemId, slotMapId, number: { $in: numbers }, userName: user.aud })
    if (!foundSlots.length || foundSlots.length !== numbers.length) throw new Error()

    const isOccupied = foundSlots.every((slot) => slot.status === SlotStatus.OCCUPIED)
    const isSold = foundSlots.every((slot) => slot.status === SlotStatus.SOLD)
    if (isOccupied || isSold) {
      await slotModel.updateMany(
        { bizItemId, slotMapId, number: { $in: numbers } },
        { $set: { status: SlotStatus.FREE, userName: null } },
      )
    } else {
      throw new Error()
    }

    return { slots: foundSlots, status: SlotStatus.FREE, success: true }
  } catch (err) {
    return { slots: [], status: SlotStatus.FREE, success: false }
  }
}

async function updateSlotsOccupied({ bizItemId, slotMapId, numbers, user }: UpdateSlotsArgs): Promise<SlotChanges> {
  try {
    if (!user) throw new Error()

    const foundSlots = await slotModel.find({ bizItemId, slotMapId, status: SlotStatus.FREE, number: { $in: numbers } })
    if (!foundSlots.length || foundSlots.length !== numbers.length) throw new Error()

    await slotModel.updateMany(
      { bizItemId, slotMapId, number: { $in: numbers } },
      { $set: { status: SlotStatus.OCCUPIED, userName: user.aud } },
    )

    return { slots: foundSlots, status: SlotStatus.OCCUPIED, success: true }
  } catch (err) {
    return { slots: [], status: SlotStatus.OCCUPIED, success: false }
  }
}

async function updateSlotsSold({ bizItemId, slotMapId, numbers, user }: UpdateSlotsArgs): Promise<SlotChanges> {
  try {
    if (!user) throw new Error()

    const foundSlots = await slotModel.find({
      bizItemId,
      slotMapId,
      status: SlotStatus.OCCUPIED,
      number: { $in: numbers },
      userName: user.aud,
    })
    if (!foundSlots.length || foundSlots.length !== numbers.length) throw new Error()

    await slotModel.updateMany(
      { bizItemId, slotMapId, number: { $in: numbers } },
      { $set: { status: SlotStatus.SOLD } },
    )

    return { slots: foundSlots, status: SlotStatus.SOLD, success: true }
  } catch (err) {
    return { slots: [], status: SlotStatus.SOLD, success: false }
  }
}

async function updateSlotsMany({
  bizItemId,
  slotMapId,
  numbers,
  status,
  verified = true,
}: UpdateSlotManyArgs): Promise<SlotChanges> {
  try {
    if (!verified) throw new Error()
    if (!numbers.length) throw new Error()
    const foundSlots = await slotModel.find({ bizItemId, slotMapId, number: { $in: numbers } })
    const foundStatuses: SlotStatus[] = foundSlots.map((slot) => slot.status)
    switch (status) {
      case SlotStatus.FREE:
        if (foundStatuses.includes(SlotStatus.FREE)) throw new Error()
        break
      case SlotStatus.OCCUPIED:
        if (!foundStatuses.includes(SlotStatus.FREE)) throw new Error()
        break
      case SlotStatus.SOLD:
        if (!foundStatuses.includes(SlotStatus.OCCUPIED)) throw new Error()
        break
      default:
        break
    }
    await slotModel.updateMany({ bizItemId, slotMapId, number: { $in: numbers } }, { $set: { status } })
    return { slots: foundSlots, status, success: true }
  } catch (err) {
    return { slots: [], status, success: false }
  }
}

export {
  createManySlots,
  getSlots,
  getSlot,
  updateSlotOne,
  updateSlotsMany,
  updateSlotsFree,
  updateSlotsOccupied,
  updateSlotsSold,
}
