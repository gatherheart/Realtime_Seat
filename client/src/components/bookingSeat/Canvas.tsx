import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { ISlot, ISlotObj, ISlotStatusObj, SlotStatus } from '../../interface'
import { Layer, Rect, Stage, Image } from 'react-konva'

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
  const [scale, setScale] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const img = new window.Image()
  img.src = background

  useEffect(() => {
    const scaleOnload: { x: number; y: number } = { x: 0, y: 0 }

    img.onload = () => {
      scaleOnload.x = CANVAS_SIZE / img.width
      scaleOnload.y = CANVAS_SIZE / img.height
      setScale(scaleOnload)
    }
  }, [])

  return (
    <Stage width={CANVAS_SIZE} height={CANVAS_SIZE} style={{}}>
      <Layer>
        <Image image={img} width={CANVAS_SIZE} height={CANVAS_SIZE}></Image>
        {Object.values(slotMap).map((slot) => {
          return <Seat slot={slot} scaleX={scale.x} scaleY={scale.y}></Seat>
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
      data-center-x={view[5] ? view[6] : 0}
      data-center-y={view[5] ? view[7] : 0}
      data-radius="7.0710678118654755"
      style={{ stroke: 'black', strokeWidth: 0, opacity: 1 }}
    ></Rect>
  )
}

export default Canvas
