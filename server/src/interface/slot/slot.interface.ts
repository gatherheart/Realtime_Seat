export type Position = {
  x?: number
  y?: number
  angle?: number
}

export enum SlotState {
  FREE = 'FREE',
  OCCUPIED = 'OCCUPIED',
  SOLD = 'SOLD',
}
