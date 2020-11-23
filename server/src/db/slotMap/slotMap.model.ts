import * as mongoose from 'mongoose'
import { ISlotMap } from '@interface/slotMapId/slotMap.interface'

export interface ISlotMapD extends ISlotMap, mongoose.Document {}

const SlotMapSchema: mongoose.Schema = new mongoose.Schema({
  bizItemId: { type: String, required: true },
  slotMapId: { type: String, required: true },
  slots: [{ type: mongoose.Types.ObjectId, ref: 'Slot' }],
})

SlotMapSchema.index({ bizItemId: 1, slotMapId: 1 }, { unique: true })

export default mongoose.model<ISlotMapD>('SlotMap', SlotMapSchema)
