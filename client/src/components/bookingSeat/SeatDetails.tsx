import React, { useState, useEffect } from 'react'
import { gql, useQuery, useSubscription } from '@apollo/client'

import { ISlot, SlotStatus, ISlotChanges } from '../../interface'

const GET_SLOTS = gql`
  query getSlots($bizItemId: String!, $slotMapId: String!) {
    slots(bizItemId: $bizItemId, slotMapId: $slotMapId) {
      status
      typeName
    }
  }
`

const SUBSCRIBE_SLOTS = gql`
  subscription subscribeSlots($bizItemId: String!, $slotMapId: String!) {
    slots(bizItemId: $bizItemId, slotMapId: $slotMapId) {
      slots {
        typeName
        status
      }
      status
    }
  }
`
interface ICounter {
  [typeName: string]: {
    [SlotStatus.FREE]: number
    [SlotStatus.OCCUPIED]: number
    [SlotStatus.SOLD]?: number
  }
}

interface Props {
  bizItemId: string
  slotMapId: string
}

export default function SeatDetails(variables: Props) {
  const [typeNameCounter, setTypeNameCounter] = useState<ICounter>({})

  const { data: { slots: initialSeats } = {} } = useQuery<{ slots: ISlot[] }, Props>(GET_SLOTS, {
    variables,
    onCompleted: () => {
      const counter =
        initialSeats?.reduce((acc: ICounter, { status, typeName }) => {
          typeName in acc
            ? acc[typeName][status]++
            : (acc[typeName] = { [SlotStatus.FREE]: 0, [SlotStatus.OCCUPIED]: 0, [status]: 1 })
          return acc
        }, {}) || {}
      setTypeNameCounter(counter)
    },
  })

  const { data: { slots: slotChanges } = {} } = useSubscription<{ slots: ISlotChanges }>(SUBSCRIBE_SLOTS, { variables })

  useEffect(() => {
    if (!slotChanges) return
    const { slots, status: postStatus } = slotChanges
    const counter = slots.reduce((acc: ICounter, { typeName, status: preStatus }) => {
      const seatClass = typeName in acc ? { ...acc[typeName] } : { ...typeNameCounter[typeName] }
      return {
        ...acc,
        [typeName]: {
          ...seatClass,
          [preStatus]: (seatClass[preStatus] as number) - 1,
          [postStatus]: (seatClass[postStatus] as number) + 1,
        },
      }
    }, {})
    setTypeNameCounter({
      ...typeNameCounter,
      ...counter,
    })
  }, [slotChanges])

  return (
    <>
      {Object.entries(typeNameCounter).map(([typeName, seatStatusCount], idx) => (
        <p key={idx}>{`${typeName} 잔여 ${seatStatusCount[SlotStatus.FREE]}석 예약 중 ${
          seatStatusCount[SlotStatus.OCCUPIED]
        } 석`}</p>
      ))}
    </>
  )
}
