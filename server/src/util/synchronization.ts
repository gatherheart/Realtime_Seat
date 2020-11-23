import { ISlot, SlotStatus } from '../interface/slot/slot.interface'
import { getSlotInfo } from './api'
import { createManySlots } from '../controller/slot/slot.controller'
import slotMapModel from '../db/slotMap/slotMap.model'
import { Types } from 'mongoose'
import { ISlotD } from '../db/slot/slot.model'

interface syncSlotsArgs {
  businessId: string
  bizItemId: string
  slotMapId: string
}

// utils for Synchronization with booking-web server
export const syncSlots = async ({ businessId, bizItemId, slotMapId }: syncSlotsArgs): Promise<Array<ISlot>> => {
  try {
    const slotInfo = await getSlotInfo({ businessId, bizItemId, slotMapId })
    const seats = []

    slotInfo.seatGroups.forEach((seatGroup) => {
      seatGroup.seats.forEach((seat) =>
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
    const createdSeats: ISlotD[] = await createManySlots(seats)
    const slots: Types.ObjectId[] = createdSeats.map((c) => c.id)

    await slotMapModel.create({
      bizItemId: bizItemId,
      slotMapId: slotMapId,
      slots: slots,
    })
    return createdSeats
  } catch (err) {
    throw new Error(err)
  }
}
