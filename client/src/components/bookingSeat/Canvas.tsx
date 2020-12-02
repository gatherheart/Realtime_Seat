import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { ISlot, ISlotObj, ISlotStatusObj, SlotStatus } from '../../interface'
import { Layer, Rect, Stage, Image } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'
import { gql, useMutation } from '@apollo/client'

interface CanvasProps {
  slotStates: ISlotStatusObj
  slotMap: ISlotObj
  bizItemId: string
  slotMapId: string
}

interface SeatProps {
  slot: ISlot
  scaleX: number
  scaleY: number
  status: SlotStatus
  onPress: (arg0: string) => void
}

interface SlotChangeArgs {
  bizItemId: string
  slotMapId: string
  number: string
  status: SlotStatus
}

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

const CANVAS_SIZE = 657
const SCALE_BY_VALUE = 1.02
const background = 'https://naverbooking-phinf.pstatic.net/20201007_220/1602053055804OStiU_PNG/image.png'

const Canvas: React.FC<CanvasProps> = ({ slotStates, slotMap, bizItemId, slotMapId }: CanvasProps): ReactElement => {
  const [seatScale, setSeatScale] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [stageScale, setStageScale] = useState<{ stageX: number; stageY: number; scale: number }>({
    stageX: 0,
    stageY: 0,
    scale: 1,
  })
  const [updateSlot, { data: updatedData }] = useMutation<{ updatedSlots: ISlot[] }, SlotChangeArgs>(SLOT_MUTATION)

  const handleSelectedSeat = (number: string) => {
    switch (slotMap[number].status) {
      case SlotStatus.FREE:
        void updateSlot({
          variables: { bizItemId, slotMapId, status: SlotStatus.OCCUPIED, number },
        })
        break
      default:
        break
    }
  }

  const handleWheel = useCallback((event: KonvaEventObject<WheelEvent>) => {
    event.evt.preventDefault()
    const scaleBy = SCALE_BY_VALUE
    const stage = event.target.getStage()
    const oldScale = stage?.scaleX()
    const position = stage?.getPointerPosition()

    if (stage && oldScale && position) {
      const mousePointTo = {
        x: position.x / oldScale - stage.x() / oldScale,
        y: position.y / oldScale - stage.y() / oldScale,
      }

      const newScale = event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy
      setStageScale({
        stageX: -(mousePointTo.x - position.x / newScale) * newScale,
        stageY: -(mousePointTo.y - position.y / newScale) * newScale,
        scale: newScale,
      })
    }
  }, [])
  const img = new window.Image()
  img.src = background

  useEffect(() => {
    const scaleOnload: { x: number; y: number } = { x: 0, y: 0 }

    img.onload = () => {
      scaleOnload.x = CANVAS_SIZE / img.width
      scaleOnload.y = CANVAS_SIZE / img.height
      setSeatScale(scaleOnload)
    }
  }, [])

  return (
    <Stage
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      onWheel={handleWheel}
      x={stageScale.stageX}
      y={stageScale.stageY}
      scaleX={stageScale.scale}
      scaleY={stageScale.scale}
      draggable
    >
      <Layer>
        <Image image={img} width={CANVAS_SIZE} height={CANVAS_SIZE}></Image>
        {Object.values(slotMap).map((slot) => {
          return (
            <Seat
              slot={slot}
              status={slotStates[slot.number]}
              scaleX={seatScale.x}
              scaleY={seatScale.y}
              onPress={handleSelectedSeat}
            ></Seat>
          )
        })}
      </Layer>
    </Stage>
  )
}

const Seat: React.FC<SeatProps> = React.memo(
  ({ slot, status, scaleX, scaleY, onPress }: SeatProps): ReactElement => {
    const view = slot.view
      .split(',')
      .slice(1)
      .map((x) => Number(x))
    const color =
      status === SlotStatus.FREE
        ? slot.typeName === 'VIP석'
          ? 'rgba(255, 0, 0, 0.5)'
          : slot.typeName === 'R석'
          ? 'rgba(255, 255, 0, 0.5)'
          : 'rgba(255, 0, 255, 0.5)'
        : status === SlotStatus.OCCUPIED
        ? 'black'
        : 'rgba(0, 0, 0, 0)'

    return (
      <Rect
        id={`${slot.number}`}
        x={view[0] * scaleX + (view[2] * scaleX) / 2}
        y={view[1] * scaleY + (view[3] * scaleY) / 2}
        width={view[2] * scaleX}
        height={view[3] * scaleY}
        fill={color}
        className="seat-normal"
        rotation={view[4]}
        offsetX={(view[2] * scaleX) / 2}
        offsetY={(view[3] * scaleY) / 2}
        onClick={() => onPress(slot.number)}
      ></Rect>
    )
  },
)

export default Canvas
