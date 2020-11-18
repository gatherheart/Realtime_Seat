import * as mongoose from 'mongoose'
import { SlotState } from '../../interface/slot/slot.interface'

export const SLOT_HASH_MAP_KEY = 'slotHashMap'

export interface ISlot extends mongoose.Document {
  slotId: string
  view: string
  state?: SlotState
  typeName: string
}

export const SlotSchema: mongoose.Schema = new mongoose.Schema({
  slotId: { type: String, required: true, unique: true },
  view: { type: String, default: 'rect,0.0,0.0,10.0,10.0,0.0' },
  state: { type: String, enum: ['FREE', 'OCCUPIED', 'SOLD'], default: 'FREE', required: true },
  typeName: { type: String, required: true },
})

export default mongoose.model<ISlot>('Slot', SlotSchema)
