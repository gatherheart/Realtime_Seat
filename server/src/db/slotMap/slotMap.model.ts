import * as mongoose from 'mongoose'
import { ISlotMap } from '../../interface/slotMapId/slotMap.interface'
import { SlotSchema } from '../slot/slot.model'

export interface ISlotMapD extends ISlotMap, mongoose.Document {}

const SlotMapSchema: mongoose.Schema = new mongoose.Schema({
  slotMapId: { type: String, required: true, unique: true },
  slots: { type: [SlotSchema], required: true },
})

export default mongoose.model<ISlotMapD>('SlotMap', SlotMapSchema)
