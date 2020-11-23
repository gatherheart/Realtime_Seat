import { getSlots, getSlot, changeSlotStates } from '@controller/slot/slot.controller'
import { IContext } from '@interface/graphql.interface'
import { SlotStatus } from '@interface/slot/slot.interface'

const resolvers = {
  Query: {
    slot: (_: unknown, { bizItemId, slotMapId, number }) => {
      try {
        return getSlot({ bizItemId, slotMapId, number })
      } catch (err) {
        throw new Error(err)
      }
    },
    slots: async (_: unknown, { bizItemId, slotMapId }) => {
      try {
        const slots = await getSlots({ bizItemId, slotMapId })
        return slots
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    updateSlots: async (_: unknown, { bizItemId, slotMapId, numbers, status }) => {
      try {
        return await changeSlotStates({ bizItemId, slotMapId, numbers, status })
      } catch (err) {
        throw new Error(err)
      }
    },
    pubSlots: async (
      _: unknown,
      {
        bizItemId,
        slotMapId,
        numbers,
        status,
      }: { bizItemId: string; slotMapId: string; numbers: string[]; status: SlotStatus },
      { pubsub }: IContext,
    ) => {
      const channel = bizItemId + slotMapId
      const slots = await changeSlotStates({ bizItemId, slotMapId, numbers, status })
      pubsub.publish(channel, { slots: { numbers, status } })
      return slots
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
