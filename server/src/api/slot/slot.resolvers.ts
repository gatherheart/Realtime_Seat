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
      const channel = bizItemId + slotMapId
      const slotChanges = await updateSlotOne({ bizItemId, slotMapId, number, status })
      pubsub.publish(channel, { slots: { slots: slotChanges.slots, status } })
      return slotChanges
    },

    freeSlots: async (
      _: unknown,
      { bizItemId, slotMapId, numbers }: ISlotsInput,
      { pubsub, user, error }: IContext,
    ) => {
      const channel = bizItemId + slotMapId
      const slotChanges = await updateSlotsMany({
        bizItemId,
        slotMapId,
        numbers: numbers.filter((number) => occupiedToFreeTimers[number]?.uid === user.aud),
        status: SlotStatus.FREE,
        verified: !error,
      })

      if (slotChanges.success) {
        pubsub.publish(channel, { slots: slotChanges })
        slotChanges.slots.forEach(({ number }) => {
          clearTimeout(occupiedToFreeTimers[number]?.timer)
          delete occupiedToFreeTimers[number]
        })
      }

      return slotChanges
    },

    occupySlots: async (
      _: unknown,
      { bizItemId, slotMapId, numbers }: ISlotsInput,
      { pubsub, user, error }: IContext,
    ) => {
      const channel = bizItemId + slotMapId
      const slotChanges = await updateSlotsMany({
        bizItemId,
        slotMapId,
        numbers,
        status: SlotStatus.OCCUPIED,
        verified: !error,
      })

      if (slotChanges.success) {
        pubsub.publish(channel, { slots: slotChanges })
        occupiedToFreeTimers = slotChanges.slots.reduce(
          (timer, slot) => ({
            ...timer,
            [slot.number]: {
              uid: user.aud,
              timer: setTimeout(async () => {
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
              }, 480000),
            },
          }),
          occupiedToFreeTimers,
        )
      }

      return slotChanges
    },

    bookSlots: async (
      _: unknown,
      { bizItemId, slotMapId, numbers }: ISlotsInput,
      { pubsub, user, error }: IContext,
    ) => {
      const channel = bizItemId + slotMapId
      const slotChanges = await updateSlotsMany({
        bizItemId,
        slotMapId,
        numbers: numbers.filter((number) => occupiedToFreeTimers[number]?.uid === user.aud),
        status: SlotStatus.SOLD,
        verified: !error,
      })

      if (slotChanges.success) {
        pubsub.publish(channel, { slots: slotChanges })
        slotChanges.slots.forEach(({ number }) => {
          clearTimeout(occupiedToFreeTimers[number]?.timer)
          delete clearTimeout[number]
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
        const channel = bizItemId + slotMapId
        return pubsub.asyncIterator(channel)
      },
    },
  },
}

export default resolvers
