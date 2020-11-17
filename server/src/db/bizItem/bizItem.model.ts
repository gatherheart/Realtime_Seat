import * as mongoose from 'mongoose'

export interface IBizItem extends mongoose.Document {
  businessId: string
  bizItemId: string
  slotMapId: [string]
}

const BizItemSchema: mongoose.Schema = new mongoose.Schema({
  businessId: { type: String, required: true },
  bizItemId: { type: String, required: true, unique: true },
  slotMapId: { type: [String] },
})

export default mongoose.model<IBizItem>('BizItem', BizItemSchema)
