export enum SlotStatus {
  FREE = 'FREE',
  OCCUPIED = 'OCCUPIED',
  SOLD = 'SOLD',
}

export interface ISlot {
  slotId: string
  view: string
  status: SlotStatus
  typeName: string
}
