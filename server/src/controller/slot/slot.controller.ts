import Slot, { ISlot, SLOT_HASH_MAP_KEY, SlotState } from '../../db/slot/slot.model'
import { CreateQuery } from 'mongoose'
import { redis } from '../../db/database'

async function createSlot({ slotId, position, typeName }: CreateQuery<ISlot>): Promise<ISlot> {
  return Slot.create({
    slotId,
    position,
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

export { createSlot, findSlotById }
