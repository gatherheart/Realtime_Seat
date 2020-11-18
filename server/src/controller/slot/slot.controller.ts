import Slot, { ISlot, SLOT_HASH_MAP_KEY } from '../../db/slot/slot.model'
import { CreateQuery } from 'mongoose'
import { redis } from '../../db/database'
import { SlotState } from '../../interface/slot/slot.interface'

function createSlot({ slotId, view, typeName }: CreateQuery<ISlot>): Promise<ISlot> {
  return Slot.create({
    slotId,
    view,
    state: SlotState.FREE,
    typeName,
  })
    .then((data: ISlot) => {
      return data
    })
    .catch((error: Error) => {
      throw error
    })
}

function createManySlots(slotInfos: Array<CreateQuery<ISlot>>): Promise<Array<ISlot>> {
  return Slot.insertMany(slotInfos)
    .then((data: Array<ISlot>) => {
      return data
    })
    .catch((error: Error) => {
      throw error
    })
}

function findSlotById({ slotId }: CreateQuery<{ slotId: string }>): Promise<ISlot> {
  return new Promise<ISlot>((resolve, reject) => {
    redis.hget(SLOT_HASH_MAP_KEY, slotId, (err, reply) => {
      if (err) {
        return reject(err)
      } else if (reply) {
        const foundSlot: ISlot = JSON.parse(reply) as ISlot
        resolve(foundSlot)
      } else {
        Slot.findOne({
          slotId,
        })
          .then((foundSlot: ISlot) => {
            redis.hset(SLOT_HASH_MAP_KEY, slotId, JSON.stringify(foundSlot))
            resolve(foundSlot)
          })
          .catch((error: Error) => {
            throw error
          })
      }
    })
  })
}

export { createSlot, findSlotById, createManySlots }
