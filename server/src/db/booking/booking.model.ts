import * as mongoose from 'mongoose'

export interface IBooking extends mongoose.Document {
  remains: number
  bookName: string
}

const BookingSchema: mongoose.Schema = new mongoose.Schema({
  remains: { type: Number, required: true },
  bookName: { type: String, required: true },
})

export default mongoose.model<IBooking>('Booking', BookingSchema)
