import { getSlots, getSlot, updateSlotOne, updateSlotsMany } from '@controller/slot/slot.controller'
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
      const channel = bizItemId + slotMapId
      const slotChanges = await updateSlotOne({ bizItemId, slotMapId, number, status })
      pubsub.publish(channel, { slots: { slots: slotChanges.slots, status } })
      return slotChanges
    },

    freeSlots: async (_: unknown, { bizItemId, slotMapId, numbers }: ISlotsInput, { pubsub }: IContext) => {
      const channel = bizItemId + slotMapId
      const slotChanges = await updateSlotsMany({ bizItemId, slotMapId, numbers, status: SlotStatus.FREE })

      if (slotChanges.success) {
        slotChanges.slots.forEach(({ number }) => {
          clearTimeout(occupiedToFreeTimers[number])
          delete occupiedToFreeTimers[number]
        })
      }

      pubsub.publish(channel, { slots: slotChanges })
      return slotChanges
    },

    occupySlots: async (_: unknown, { bizItemId, slotMapId, numbers }: ISlotsInput, { pubsub }: IContext) => {
      const channel = bizItemId + slotMapId
      const slotChanges = await updateSlotsMany({ bizItemId, slotMapId, numbers, status: SlotStatus.OCCUPIED })
      pubsub.publish(channel, { slots: slotChanges })

      const timers = slotChanges.slots.reduce(
        (accTimers, slot) => ({
          ...accTimers,
          [slot.number]: setTimeout(async () => {
            const { bizItemId: timerBizItemId, slotMapId: timerSlotMapId, number: timerNumber } = slot
            const timerChannel = timerBizItemId + timerSlotMapId
            const args = {
              bizItemId: slot.bizItemId,
              slotMapId: slot.slotMapId,
              numbers: [timerNumber],
              status: SlotStatus.FREE,
            }
            const slotChanges = await updateSlotsMany(args)
            pubsub.publish(timerChannel, { slots: slotChanges })
          }, 10000),
        }),
        {},
      )

      occupiedToFreeTimers = {
        ...occupiedToFreeTimers,
        ...timers,
      }
      return slotChanges
    },

    bookSlots: async (_: unknown, { bizItemId, slotMapId, numbers }: ISlotsInput, { pubsub }: IContext) => {
      const channel = bizItemId + slotMapId
      const slotChanges = await updateSlotsMany({ bizItemId, slotMapId, numbers, status: SlotStatus.SOLD })
      pubsub.publish(channel, { slots: slotChanges })
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
        const channel = bizItemId + slotMapId
        return pubsub.asyncIterator(channel)
      },
    },
  },
}

export default resolvers
