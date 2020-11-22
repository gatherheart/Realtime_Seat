export interface IBooking {
  bookingId: string
  booking: BookingDetail[]
  createdAt: Date
}

interface BookingDetail {
  bizItemId: string
  slotId: string
  slotMapId: string
}
