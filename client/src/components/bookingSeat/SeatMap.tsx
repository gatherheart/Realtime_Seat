import React, { useEffect, useState } from 'react'
import { gql, useQuery, useSubscription } from '@apollo/client'
import Seat from './Seat'
import { ISlot, SlotStatus } from '../../interface'

interface SlotChanges {
  numbers: string[]
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
export default function SeatMap(): JSX.Element {
  // to-do: change variables dynamically
  const { data: { slots } = {} } = useQuery<{ slots: ISlot[] | null }>(SLOTS_QUERY, {
    variables: { bizItemId: '3626905', slotMapId: '192575960' },
  })
  const { data: { slots: slotChanges } = {}, loading, error } = useSubscription<{ slots: SlotChanges | null }>(
    SLOTS_SUBSCRIPTION,
    {
      variables: { bizItemId: '3626905', slotMapId: '192575960' },
    },
  )

  const slotMap: { [key: string]: SlotStatus } = {}

  slots?.forEach((slot) => {
    slotMap[slot.number] = slot.status
  })
  const [slotStates, setSlotStates] = useState(slotMap)

  useEffect(() => {
    if (slotChanges) {
      const { numbers, status } = slotChanges
      const changes: { [key: string]: SlotStatus } = numbers.reduce(
        (obj, number) => ({ ...obj, [changes[number]]: status }),
        {},
      )
      setSlotStates((slotStates) => ({ ...slotStates, ...changes }))
    }
  }, [slotChanges])

  return (
    <div>
      <span>SeatMap</span>
      <div>
        {Object.keys(slotMap).map((number) => {
          return <Seat status={slotStates[number]} number={number}></Seat>
        })}
      </div>
    </div>
  )
}
