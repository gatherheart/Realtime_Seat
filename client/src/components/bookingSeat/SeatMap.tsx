import React, { useEffect, useState } from 'react'
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client'
import { useParams } from 'react-router-dom'

import Seat from './Seat'
import { ISlot, SlotStatus, ISlotChanges } from '../../interface'

interface SlotChangeArgs {
  bizItemId: string
  slotMapId: string
  number: string
  status: SlotStatus
}

const SLOTS_QUERY = gql`
  query InitialSlotData($bizItemId: String!, $slotMapId: String!) {
    slots(bizItemId: $bizItemId, slotMapId: $slotMapId) {
      slotMapId
      number
      view
      status
    }
  }
`

const SLOTS_SUBSCRIPTION = gql`
  subscription OnSlotStateChanges($bizItemId: String!, $slotMapId: String!) {
    slots(bizItemId: $bizItemId, slotMapId: $slotMapId) {
      slots {
        number
      }
      status
    }
  }
`

const SLOT_MUTATION = gql`
  mutation OccupySeat($bizItemId: String!, $slotMapId: String!, $number: String!, $status: SlotStatus!) {
    updateSlot(bizItemId: $bizItemId, slotMapId: $slotMapId, number: $number, status: $status) {
      slots {
        number
      }
      status
    }
  }
`

export default function SeatMap() {
  const variables = useParams<{ bizItemId: string; slotMapId: string }>()

  const { data: { slots } = {} } = useQuery<{ slots: ISlot[] | null }>(SLOTS_QUERY, { variables })
  const { data: { slots: slotChanges } = {}, loading, error } = useSubscription<{ slots: ISlotChanges | null }>(
    SLOTS_SUBSCRIPTION,
    { variables },
  )
  const [updateSlot, { data: updatedData }] = useMutation<{ updatedSlots: ISlot[] }, SlotChangeArgs>(SLOT_MUTATION)

  const slotMap: { [key: string]: SlotStatus } | undefined = slots?.reduce(
    (map, slot) => ({
      ...map,
      [slot.number]: slot.status,
    }),
    {},
  )
  const [slotStates, setSlotStates] = useState(slotMap)
  useEffect(() => {
    if (!slotStates && slotMap) setSlotStates(slotMap)
  }, [slotMap])

  useEffect(() => {
    if (slotChanges) {
      const { slots, status } = slotChanges
      const changes: { [key: string]: SlotStatus } = slots.reduce(
        (map, slot) => ({ ...map, [slot.number]: status }),
        {},
      )

      setSlotStates((slotStates) => ({ ...slotStates, ...changes }))
    }
  }, [slotChanges])

  return (
    <div>
      <span>SeatMap</span>
      <div>
        {/* to-do: use Canvas & svg considering the order & position */}
        {slotMap &&
          slotStates &&
          Object.keys(slotMap).map((number) => {
            return (
              <Seat
                status={slotStates[number]}
                number={number}
                onPress={(number) => {
                  void updateSlot({
                    variables: { ...variables, status: SlotStatus.OCCUPIED, number },
                  })
                }}
              ></Seat>
            )
          })}
      </div>
    </div>
  )
}
