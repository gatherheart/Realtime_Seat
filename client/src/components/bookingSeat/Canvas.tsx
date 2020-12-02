import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { ISlot, ISlotObj, ISlotStatusObj, SlotStatus } from '../../interface'
import { Layer, Rect, Stage, Image } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'

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
}

const CANVAS_SIZE = 657
const background = 'https://naverbooking-phinf.pstatic.net/20201007_220/1602053055804OStiU_PNG/image.png'

const Canvas: React.FC<CanvasProps> = ({ slotStates, slotMap, bizItemId, slotMapId }: CanvasProps): ReactElement => {
  const [seatScale, setSeatScale] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [stageScale, setStageScale] = useState<{ stageX: number; stageY: number; scale: number }>({
    stageX: 0,
    stageY: 0,
    scale: 1,
  })

  const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
    event.evt.preventDefault()
    const scaleBy = 1.02
    const stage = event.target.getStage()
    const oldScale = stage?.scaleX()
    const position = stage?.getPointerPosition()
    console.log(oldScale, stage?.x(), stage?.y())
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
  }
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
          return <Seat slot={slot} scaleX={seatScale.x} scaleY={seatScale.y}></Seat>
        })}
      </Layer>
    </Stage>
  )
}

const Seat: React.FC<SeatProps> = ({ slot, scaleX, scaleY }: SeatProps): ReactElement => {
  const view = slot.view
    .split(',')
    .slice(1)
    .map((x) => Number(x))
  console.log(view)
  const color =
    slot.status === SlotStatus.FREE ? 'blue' : slot.status === SlotStatus.OCCUPIED ? 'yellow' : 'rgba(0, 0, 0, 0)'
  return (
    <Rect
      id={`${slot.number}`}
      x={view[0] * scaleX}
      y={view[1] * scaleY}
      width={view[2] * scaleX}
      height={view[3] * scaleY}
      fill={color}
      className="seat-normal"
      data-radius="7.0710678118654755"
      rotation={view[4]}
      onClick={() => {
        console.log(slot.number)
      }}
    ></Rect>
  )
}

export default Canvas
