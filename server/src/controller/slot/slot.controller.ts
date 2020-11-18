import Slot from '../../db/slot/slot.model'
import { CreateQuery } from 'mongoose'
import { redis } from '../../db/database'
import { SlotStatus, ISlot } from '../../interface/slot/slot.interface'
import slotMapModel from '../../db/slotMap/slotMap.model'
import { ISlotMap } from '../../interface/slotMapId/slotMap.interface'
import { SLOT_HASH_MAP_KEY } from '../../constant/hashMapKey'

function createSlot({ slotId, view, typeName }: CreateQuery<ISlot>): Promise<ISlot> {
  return Slot.create({
    slotId,
    view,
    status: SlotStatus.FREE,
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

function getSlotsBySlotMapId(slotMapId: string): Promise<Array<ISlot>> {
  return new Promise<Array<ISlot>>((resolve, reject) => {
    redis.hget(SLOT_HASH_MAP_KEY, slotMapId, (err, reply) => {
      if (err) {
        return reject(err)
      } else if (reply) {
        const slotMap: ISlotMap = JSON.parse(reply) as ISlotMap
        resolve(slotMap.slots)
      } else {
        slotMapModel
          .findOne({
            slotMapId,
          })
          .then((slotMap: ISlotMap) => {
            redis.hset(SLOT_HASH_MAP_KEY, slotMapId, JSON.stringify(slotMap))
            resolve(slotMap.slots)
          })
          .catch((error: Error) => {
            throw error
          })
      }
    })
  })
}

function findSlotById({ slotId }: { slotId: string }): Promise<ISlot> {
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

export { createSlot, findSlotById, createManySlots, getSlotsBySlotMapId }
