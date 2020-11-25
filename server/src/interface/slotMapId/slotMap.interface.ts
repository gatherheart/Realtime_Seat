import { ISlot } from '@interface/slot/slot.interface'
import { Types } from 'mongoose'

export interface ISlotMap {
  bizItemId: string
  slotMapId: string
  slots: Types.ObjectId[] | ISlot[]
}
