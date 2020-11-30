// BizItem
export interface IBizItem {
  businessId: string
  bizItemId: string
  slotMapIds: string[]
}

// BizItemInfo
export interface IExtraDesc {
  title: string
  context: string
  images: Array<{ src: string; url: string }>
}

interface IAddress {
  jibun?: string
  reoadAddr?: string
  detail?: string
  address?: string
  posLat?: number
  posLong?: number
  zoomLevel?: number
  placeName?: string
}

export interface IBizItemDetails {
  name: string
  desc: string
  extraDescJson: IExtraDesc[]
  addressJson: IAddress
}

// Booking
// un-used
export interface BookingDetail {
  bizItemId: string
  slotId: string
  slotMapId: string
}

// un-used
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
  bizItemId: string
  slotMapId: string
  number: string
  view: string
  status: SlotStatus
  typeName: string
}

export interface ISlotChanges {
  slots: ISlot[]
  status: SlotStatus
}

export interface ISlotStatusObj {
  [key: string]: SlotStatus
}

export interface ISlotObj {
  [key: string]: ISlot
}

// un-used
export interface ISlotMap {
  bizItemId: string
  slotMapId: string
  slots: ISlot[]
}

// Reducer
export interface IPerformanceTime {
  date: Date
  slotMapId: string
}

export interface IState {
  name?: string
  desc?: string
  thumbnail?: string
  extraDesc?: IExtraDesc[]
  address?: IAddress
  performanceTimes?: IPerformanceTime[]
  seats?: Set<string>
}
