import {
  getSlots,
  getSlot,
  updateSlotOne,
  updateSlotsFree,
  updateSlotsOccupied,
  updateSlotsSold,
} from '@controller/slot/slot.controller'
import { IContext } from '@interface/graphql.interface'
import { SlotStatus, ISlotsInput } from '@interface/slot/slot.interface'

let occupiedToFreeTimers = {}

const resolvers = {
  Query: {
    slot: (_: unknown, { bizItemId, slotMapId, number }) => {
      return getSlot({ bizItemId, slotMapId, number })
    },
    slots: async (_: unknown, { bizItemId, slotMapId }) => {
      const slots = await getSlots({ bizItemId, slotMapId })
      return slots
    },
  },

  Mutation: {
    // legacy api. will be removed after client update
    updateSlot: async (
      _: unknown,
      {
        bizItemId,
        slotMapId,
        number,
        status,
      }: { bizItemId: string; slotMapId: string; number: string; status: SlotStatus },
      { pubsub }: IContext,
    ) => {
      const channel = `${bizItemId}_${slotMapId}`
      const slotChanges = await updateSlotOne({ bizItemId, slotMapId, number, status })
      pubsub.publish(channel, { slots: { slots: slotChanges.slots, status } })
      return slotChanges
    },

    freeSlots: async (_: unknown, { bizItemId, slotMapId, numbers }: ISlotsInput, { pubsub, user }: IContext) => {
      const slotChanges = await updateSlotsFree({
        bizItemId,
        slotMapId,
        numbers,
        user,
      })

      if (slotChanges.success) {
        const channel = `${bizItemId}_${slotMapId}`
        pubsub.publish(channel, { slots: slotChanges })
        slotChanges.slots.forEach(({ number }) => {
          clearTimeout(occupiedToFreeTimers[channel][number])
          delete occupiedToFreeTimers[channel][number]
        })
      }

      return slotChanges
    },

    occupySlots: async (_: unknown, { bizItemId, slotMapId, numbers }: ISlotsInput, { pubsub, user }: IContext) => {
      const slotChanges = await updateSlotsOccupied({ bizItemId, slotMapId, numbers, user })

      if (slotChanges.success) {
        const channel = `${bizItemId}_${slotMapId}`
        pubsub.publish(channel, { slots: slotChanges })
        occupiedToFreeTimers[channel] = slotChanges.slots.reduce(
          (timers, { bizItemId, slotMapId, number }) => ({
            ...timers,
            [number]: setTimeout(async () => {
              const timerChannel = `${bizItemId}_${slotMapId}`
              const slotChanges = await updateSlotsFree({
                bizItemId,
                slotMapId,
                numbers: [number],
                user,
              })
              pubsub.publish(timerChannel, { slots: slotChanges })
            }, 480000),
          }),
          occupiedToFreeTimers[channel] ?? {},
        )
      }

      return slotChanges
    },

    bookSlots: async (_: unknown, { bizItemId, slotMapId, numbers }: ISlotsInput, { pubsub, user }: IContext) => {
      const slotChanges = await updateSlotsSold({
        bizItemId,
        slotMapId,
        numbers,
        user,
      })

      if (slotChanges.success) {
        const channel = `${bizItemId}_${slotMapId}`
        pubsub.publish(channel, { slots: slotChanges })
        slotChanges.slots.forEach(({ number }) => {
          clearTimeout(occupiedToFreeTimers[channel][number])
          delete clearTimeout[channel][number]
        })
      }

      return slotChanges
    },
  },

  Subscription: {
    slots: {
      subscribe: (
        _: unknown,
        { bizItemId, slotMapId }: { bizItemId: string; slotMapId: string },
        { pubsub }: IContext,
      ) => {
        const channel = `${bizItemId}_${slotMapId}`
        return pubsub.asyncIterator(channel)
      },
    },
  },
}

export default resolvers
