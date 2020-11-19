// BizItem
export interface IBizItem {
  businessId: string
  bizItemId: string
  slotMapId: string[]
}

// BizItemInfo
export interface IBizItemInfo {
  name: string
  desc: string
}

// Booking
export interface BookingDetail {
  bizItemId: string
  slotId: string
  slotMapId: string
}

export interface IBooking {
  bookingId: string
  booking: BookingDetail[]
  createdAt: Date
}

// Slot
export enum SlotStatus {
  FREE = 'FREE',
  OCCUPIED = 'OCCUPIED',
  SOLD = 'SOLD',
}

export interface ISlot {
  slotId: string
  view: string
  status: SlotStatus
  typeName: string
}

export interface ISlotMap {
  slotMapId: string
  slots: ISlot[]
}
