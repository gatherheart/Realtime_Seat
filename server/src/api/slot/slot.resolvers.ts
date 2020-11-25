import { getSlots, getSlot, updateSlotOne, updateSlotsMany } from '@controller/slot/slot.controller'
import { IContext } from '@interface/graphql.interface'
import { ISlot, SlotStatus } from '@interface/slot/slot.interface'

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
      pubsub.publish(channel, { slots: { numbers: [number], status } })
      return slotChanges
    },
    bookSlots: async (
      _: unknown,
      { bizItemId, slotMapId, numbers }: { bizItemId: string; slotMapId: string; numbers: string[] },
      { pubsub }: IContext,
    ) => {
      const channel = bizItemId + slotMapId
      const slotChanges = await updateSlotsMany({ bizItemId, slotMapId, numbers, status: SlotStatus.SOLD })
      pubsub.publish(channel, { slots: { numbers, status: SlotStatus.SOLD } })
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
