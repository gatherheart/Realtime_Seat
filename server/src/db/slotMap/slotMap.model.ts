import * as mongoose from 'mongoose'

export interface ISlotMap extends mongoose.Document {
  slotIds: [string]
}

const SlotMapSchema: mongoose.Schema = new mongoose.Schema({
  slotMapId: { type: [String], required: true, unique: true },
  slotIds: { type: [String], required: true },
})

export default mongoose.model<ISlotMap>('SlotMap', SlotMapSchema)
