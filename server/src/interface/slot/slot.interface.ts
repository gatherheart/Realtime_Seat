export enum SlotState {
  FREE = 'FREE',
  OCCUPIED = 'OCCUPIED',
  SOLD = 'SOLD',
}

export interface ISlot {
  slotId: string
  view: string
  state?: SlotState
  typeName: string
}
