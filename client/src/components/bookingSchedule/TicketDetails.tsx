import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { gql, useQuery } from '@apollo/client'

import { IState, ISlot } from '../../interface'

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
  slotMapId: string
}

export default function TicketDetails({ slotMapId }: Props) {
  const bizItemId = useSelector((state: IState) => state.id) || ''
  const [typeNameCounter, setTypeNameCounter] = useState<{ [key: string]: number }>({})

  const { data } = useQuery<{ slots: ISlot[] }, { bizItemId: string; slotMapId: string }>(GET_SLOTS, {
    variables: { bizItemId, slotMapId },
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
