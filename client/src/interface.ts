// BizItem
export interface IBizItem {
  businessId: string
  bizItemId: string
  slotMapId: string[]
}

export interface IExtraDesc {
  title: string
  context: string
  images: Array<{ src: string; url: string }>
}

// BizItemInfo
export interface IBizItemInfo {
  name: string
  desc: string
  extraDescJson: IExtraDesc[]
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

// Reducer
export interface ISeat {
  x: number
  y: number
  isOccupied: boolean
}

export interface IState {
  id?: string
  name?: string
  desc?: string
  thumbnail?: string
  extraDesc?: IExtraDesc[]
  location?: string
  seats?: ISeat[]
}
