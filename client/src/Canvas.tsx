import React, { ReactElement, useEffect, useRef, useState } from 'react'

interface CanvasProps {
  text: string
}

interface SeatProps {
  slot: ISlot
}

interface ISlot {
  id: number
  cord: Point
  opacity: number
}

interface Point {
  x: number
  y: number
}

const Canvas: React.FC<CanvasProps> = ({ text }: CanvasProps): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [slotStates, setSlotStates] = useState<Array<ISlot>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = new Image()
    img.src = background

    if (img && canvas && ctx) {
      img.onload = () => {
        const [imgWidth, imgHeight] = fitSizesIntoCanvas(img, canvas)
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight)
        setSlotStates((prev) => [
          ...prev,
          { id: 12315, opacity: 1, cord: { x: 276, y: 186.2 } },
          { id: 26643, opacity: 1, cord: { x: 283, y: 186.2 } },
        ])
      }
    }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE}></canvas>

      <svg
        id={'123213'}
        xmlns="http://www.w3.org/2000/svg"
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{ position: 'absolute', borderColor: 'white', borderWidth: 1, top: 0, left: 0 }}
        onClick={(event) => {
          console.dir(event.target)
          console.log(event.target as HTMLInputElement)
          console.log((event.target as HTMLInputElement).id)
          console.log((event.target as HTMLInputElement).tagName)
        }}
      >
        {slotStates.length !== 0
          ? slotStates.map((slot, idx) => {
              return <Seat slot={slot}></Seat>
            })
          : null}
      </svg>
    </div>
  )
}

const CANVAS_SIZE = 657
const background = 'https://naverbooking-phinf.pstatic.net/20201007_220/1602053055804OStiU_PNG/image.png'

const Seat: React.FC<SeatProps> = ({ slot }: SeatProps): ReactElement => {
  return (
    <rect
      id={`${slot.id}`}
      x={`${slot.cord.x}`}
      y={`${slot.cord.y}`}
      width="5.0"
      height="5.0"
      className="seat-normal"
      data-center-x="563"
      data-center-y="382"
      data-radius="7.0710678118654755"
      data-id="28253340"
      data-group="13"
      style={{ fill: 'red', stroke: 'black', strokeWidth: 0, opacity: slot.opacity }}
    ></rect>
  )
}

const fitSizesIntoCanvas = (img: HTMLImageElement, canvas: HTMLCanvasElement): Array<number> => {
  const imgRatio = img.height / img.width
  const canvasRatio = canvas.height / canvas.width
  let imageHeight = 0,
    imageWidth = 0

  if (imgRatio < canvasRatio) {
    imageWidth = canvas.width
    imageHeight = imageWidth * imgRatio
  } else {
    imageHeight = canvas.height
    imageWidth = imageHeight / imgRatio
  }
  return [imageWidth, imageHeight]
}

export default Canvas
