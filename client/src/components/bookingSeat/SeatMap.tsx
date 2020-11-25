import React, { useEffect, useState } from 'react'
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client'
import Seat from './Seat'
import { ISlot, SlotStatus } from '../../interface'

// DUMMY DATA - WILL BE REMOVED
const BIZITEM_ID = '3626905'
const SLOTMAP_ID = '192575960'

interface SlotChanges {
  numbers: string[]
  status: SlotStatus
}

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
      numbers
      status
    }
  }
`

const SLOT_MUTATION = gql`
  mutation OccupySeat($bizItemId: String!, $slotMapId: String!, $number: String!, $status: SlotStatus!) {
    updateSlot(bizItemId: $bizItemId, slotMapId: $slotMapId, number: $number, status: $status) {
      slotMapId
      status
      number
    }
  }
`

export default function SeatMap(): JSX.Element {
  // to-do: change variables dynamically
  const { data: { slots } = {} } = useQuery<{ slots: ISlot[] | null }>(SLOTS_QUERY, {
    variables: { bizItemId: BIZITEM_ID, slotMapId: SLOTMAP_ID },
  })
  const { data: { slots: slotChanges } = {}, loading, error } = useSubscription<{ slots: SlotChanges | null }>(
    SLOTS_SUBSCRIPTION,
    {
      variables: { bizItemId: BIZITEM_ID, slotMapId: SLOTMAP_ID },
    },
  )
  const [updateSlot, { data: updatedData }] = useMutation<{ updatedSlots: ISlot[] }, SlotChangeArgs>(SLOT_MUTATION)

  const slotMap: { [key: string]: SlotStatus } | undefined = slots?.reduce(
    (map, slot) => ({
      ...map,
      [slot.number]: slot.status || SlotStatus.FREE,
    }),
    {},
  )

  const [slotStates, setSlotStates] = useState(slotMap || {})

  useEffect(() => {
    if (slotChanges) {
      const { numbers, status } = slotChanges
      const changes: { [key: string]: SlotStatus } = numbers.reduce((map, number) => ({ ...map, [number]: status }), {})

      setSlotStates((slotStates) => ({ ...slotStates, ...changes }))
    }
  }, [slotChanges])

  return (
    <div>
      <span>SeatMap</span>
      <div>
        {/* to-do: use Canvas & svg considering the order & position */}
        {slotMap &&
          Object.keys(slotMap).map((number) => {
            return (
              <Seat
                status={slotStates[number]}
                number={number}
                onPress={(number) => {
                  void updateSlot({
                    variables: { bizItemId: BIZITEM_ID, slotMapId: SLOTMAP_ID, status: SlotStatus.OCCUPIED, number },
                  })
                }}
              ></Seat>
            )
          })}
      </div>
    </div>
  )
}
