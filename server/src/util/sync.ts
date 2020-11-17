import { SlotState } from '../interface/slot/slot.interface'
import { getSlotInfo } from './api'
import { createManySlots } from '../controller/slot/slot.controller'

// utils for Synchronization with booking-web server
export const syncSlots = async ({ businessId, bizItemId, slotMapId }) => {
  const slotInfo = await getSlotInfo({ businessId, bizItemId, slotMapId })
  const seats = []

  slotInfo.seatGroups.forEach((seatGroup, idx) => {
    seatGroup.seats.forEach((seat) =>
      seats.push({
        state: SlotState.FREE,
        slotId: seat.number,
        view: seat.view,
        typeName: seatGroup.typeName,
      }),
    )
  })

  await createManySlots(seats)
  return seats
}
