export enum SlotStatus {
  FREE = 'FREE',
  OCCUPIED = 'OCCUPIED',
  SOLD = 'SOLD',
}

export interface ISlot {
  bizItemId: string
  slotMapId: string
  number: string
  view: string
  status: SlotStatus
  typeName: string
  userName: string
}

export interface ISlotsInput {
  bizItemId: string
  slotMapId: string
  numbers: string[]
}

export interface SlotChanges {
  slots: ISlot[]
  status: SlotStatus
  success: boolean
}
