import { ISlot, SlotStatus } from '../interface/slot/slot.interface'
import { getSlotInfo } from './api'
import { createManySlots } from '../controller/slot/slot.controller'
import slotMapModel from '../db/slotMap/slotMap.model'

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
          state: SlotStatus.FREE,
          slotId: seat.number,
          view: seat.view,
          typeName: seatGroup.typeName,
        }),
      )
    })
    const createdSeats: ISlot[] = await createManySlots(seats)
    await slotMapModel.create({
      slotMapId: slotMapId,
      slots: createdSeats,
    })
    return createdSeats
  } catch (err) {
    throw new Error(err)
  }
}
