import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { gql, useQuery, useSubscription } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { ISlot, SlotStatus, ISlotChanges, ISlotStatusObj, ISlotObj } from '../../interface'
import Canvas from './Canvas'

const SLOTS_QUERY = gql`
  query InitialSlotData($bizItemId: String!, $slotMapId: String!) {
    slots(bizItemId: $bizItemId, slotMapId: $slotMapId) {
      slotMapId
      number
      view
      status
      typeName
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

export default function SeatMap() {
  const variables = useParams<{ bizItemId: string; slotMapId: string }>()
  const dispatch = useDispatch()

  const { data: { slots } = {} } = useQuery<{ slots: ISlot[] }>(SLOTS_QUERY, { variables })
  const { data: { slots: slotChanges } = {}, loading, error } = useSubscription<{
    slots: ISlotChanges
  }>(SLOTS_SUBSCRIPTION, { variables })

  const slotMap: ISlotObj | undefined = slots?.reduce<ISlotObj>((map, slot) => {
    map[slot.number] = slot
    return map
  }, {})

  const initialSlotStatus: ISlotStatusObj | undefined = slots?.reduce<ISlotStatusObj>((map, slot) => {
    map[slot.number] = slot.status
    return map
  }, {})

  const [slotStates, setSlotStates] = useState(initialSlotStatus)
  useEffect(() => {
    if (!slotStates && initialSlotStatus) setSlotStates(initialSlotStatus)
  }, [slots])

  useEffect(() => {
    if (slotChanges) {
      const { slots, status } = slotChanges
      const changes: { [key: string]: SlotStatus } = slots.reduce<ISlotStatusObj>((map, slot) => {
        map[slot.number] = status
        return map
      }, {})
      setSlotStates((slotStates) => ({ ...slotStates, ...changes }))
    }
  }, [slotChanges])

  return (
    <div>
      <span>SeatMap</span>
      <div>
        {/* to-do: use Canvas & svg considering the order & position */}
        {slotMap ? (
          <Canvas
            slotStates={slotStates || ({} as ISlotStatusObj)}
            slotMap={slotMap}
            bizItemId={variables.bizItemId}
            slotMapId={variables.slotMapId}
          ></Canvas>
        ) : null}
      </div>
    </div>
  )
}
