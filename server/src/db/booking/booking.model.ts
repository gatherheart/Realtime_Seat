import * as mongoose from 'mongoose'
import { IBooking } from '../../interface/booking/booking.interface'

export interface IBookingD extends IBooking, mongoose.Document {}

const BookingDetailSchema: mongoose.Schema = new mongoose.Schema({
  bizItemId: { type: String },
  slotMapId: { type: String },
  slotIds: { type: [String] },
})

const BookingSchema: mongoose.Schema = new mongoose.Schema({
  bookingId: { type: Number, required: true, unique: true },
  booking: { type: BookingDetailSchema },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<IBookingD>('Booking', BookingSchema)
