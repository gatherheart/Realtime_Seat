import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import { ISlot } from '../../interface'

const GET_SLOTS = gql`
  query getSlots($bizItemId: String!, $slotMapId: String!) {
    slots(bizItemId: $bizItemId, slotMapId: $slotMapId) {
      bizItemId
      slotMapId
      view
      status
      typeName
    }
  }
`

interface Props {
  bizItemId: string
  slotMapId: string
}

export default function TicketDetails(props: Props) {
  const [typeNameCounter, setTypeNameCounter] = useState<{ [key: string]: number }>({})

  const { data } = useQuery<{ slots: ISlot[] }, Props>(GET_SLOTS, {
    variables: props,
    onCompleted: () => {
      const counter: { [key: string]: number } = {}
      data?.slots.forEach(({ typeName }) => (counter[typeName] = counter[typeName] + 1 || 1))
      setTypeNameCounter(counter)
    },
  })

  return (
    <>
      {Object.entries(typeNameCounter).map(([typeName, seatCount], idx) => (
        <p key={idx}>{`${typeName} 잔여 ${seatCount} 석`}</p>
      ))}
    </>
  )
}
