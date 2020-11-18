import * as mongoose from 'mongoose'
import { ISlot } from '../../interface/slot/slot.interface'

export interface ISlotD extends ISlot, mongoose.Document {}

export const SlotSchema: mongoose.Schema = new mongoose.Schema({
  slotId: { type: String, required: true, unique: true },
  view: { type: String, default: 'rect,0.0,0.0,10.0,10.0,0.0' },
  status: { type: String, enum: ['FREE', 'OCCUPIED', 'SOLD'], default: 'FREE', required: true },
  typeName: { type: String, required: true },
})

export default mongoose.model<ISlotD>('Slot', SlotSchema)
