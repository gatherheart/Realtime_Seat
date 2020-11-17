import * as mongoose from 'mongoose'

export const SLOT_HASH_MAP_KEY = 'slotHashMap'

type Position = {
  x: number
  y: number
  angle: number
}

export enum SlotState {
  FREE = 'FREE',
  OCCUPIED = 'OCCUPIED',
  SOLD = 'SOLD',
}

export interface ISlot extends mongoose.Document {
  slotId: string
  position: Position
  state?: SlotState
  typeName: string
}

const PositionSchema: mongoose.Schema = new mongoose.Schema(
  {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    angle: { type: Number, default: 0 },
  },
  { _id: false },
)

export const SlotSchema: mongoose.Schema = new mongoose.Schema({
  slotId: { type: String, required: true },
  position: { type: PositionSchema, default: { x: 0, y: 0, angle: 0 } },
  state: { type: String, enum: ['FREE', 'OCCUPIED', 'SOLD'], default: 'FREE', required: true },
  typeName: { type: String, required: true },
})

export default mongoose.model<ISlot>('Slot', SlotSchema)
