import * as mongoose from 'mongoose'
import { IBizItem } from '../../interface/bizItem/bizItem.interface'

export interface IBizItemD extends IBizItem, mongoose.Document {}

const BizItemSchema: mongoose.Schema = new mongoose.Schema({
  businessId: { type: String, required: true },
  bizItemId: { type: String, required: true, unique: true },
  slotMapId: { type: [String] },
})

export default mongoose.model<IBizItemD>('BizItem', BizItemSchema)
