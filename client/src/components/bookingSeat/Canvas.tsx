import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { ISlot, ISlotObj, ISlotStatusObj, IState, SlotStatus } from '../../interface'
import { Layer, Rect, Stage, Image } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../reducer'
import { httpPort, httpUri } from '../../apolloClient'

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
  onPress: (arg0: string[]) => void
}

interface SlotChangeArgs {
  bizItemId: string
  slotMapId: string
  numbers: string[]
}

const OCCUPY_SEATS = gql`
  mutation OccupySeats($bizItemId: String!, $slotMapId: String!, $numbers: [String]!) {
    occupySlots(bizItemId: $bizItemId, slotMapId: $slotMapId, numbers: $numbers) {
      slots {
        number
      }
      status
    }
  }
`
const FREE_SEATS = gql`
  mutation FreeSeats($bizItemId: String!, $slotMapId: String!, $numbers: [String]!) {
    freeSlots(bizItemId: $bizItemId, slotMapId: $slotMapId, numbers: $numbers) {
      slots {
        number
      }
      status
    }
  }
`

const CANVAS_SIZE = 657
const SCALE_BY_VALUE = 1.02
const MAX_SCALE_VALUE = 2
const MIN_SCALE_VALUE = 1
const background = 'https://naverbooking-phinf.pstatic.net/20201007_220/1602053055804OStiU_PNG/image.png'

const Canvas: React.FC<CanvasProps> = ({ slotStates, slotMap, bizItemId, slotMapId }: CanvasProps): ReactElement => {
  const [seatScale, setSeatScale] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [stageScale, setStageScale] = useState<{ stageX: number; stageY: number; scale: number }>({
    stageX: 0,
    stageY: 0,
    scale: 1,
  })
  const [occupySeats, { data: occupiedSeats }] = useMutation<{ occupiedSeats: ISlot[] }, SlotChangeArgs>(OCCUPY_SEATS)
  const [freeSeats, { data: freedSeats }] = useMutation<{ freedSeats: ISlot[] }, SlotChangeArgs>(FREE_SEATS)

  const img = new window.Image()
  img.src = background
  const history = useHistory()
  const dispatch = useDispatch()
  const { seats: seatsInStore } = useSelector((state: IState) => state)

  const handleSelectedSeat = (numbers: string[]) => {
    // check all seats have to have same status
    if (!numbers.reduce((prev, curr) => prev && slotStates[curr] === slotStates[numbers[0]], true)) return

    switch (slotStates[numbers[0]]) {
      case SlotStatus.FREE:
        void occupySeats({
          variables: { bizItemId, slotMapId, numbers },
        })
        dispatch(actions.occupySeats(numbers))
        break
      case SlotStatus.OCCUPIED:
        void freeSeats({
          variables: { bizItemId, slotMapId, numbers },
        })
        // to-do: check whether it is occupied by me
        dispatch(actions.freeSeats(numbers))
        break
      default:
        break
    }
  }

  const handleSelectedSeatSync = (numbers: string[]) => {
    // check all seats have to have same status
    if (!numbers.reduce((prev, curr) => prev && slotStates[curr] === slotStates[numbers[0]], true)) return
    const token: string | null = localStorage.getItem('token')

    switch (slotStates[numbers[0]]) {
      case SlotStatus.OCCUPIED:
        void fetch(`http://${httpUri}:${httpPort}`, {
          method: 'POST',
          headers: new Headers({
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          }),

          body: JSON.stringify({
            query: `mutation FreeSeats($bizItemId: String!, $slotMapId: String!, $numbers: [String]!) {
              freeSlots(bizItemId: $bizItemId, slotMapId: $slotMapId, numbers: $numbers) {
                slots {
                  number
                }
                status
              }
            }`,
            variables: { bizItemId, slotMapId, numbers },
          }),
          keepalive: true,
        }).then((res) => res.json())
        // to-do: check whether it is occupied by me
        dispatch(actions.freeSeats(numbers))
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

      let newScale = event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy
      newScale = newScale > MAX_SCALE_VALUE ? MAX_SCALE_VALUE : newScale < MIN_SCALE_VALUE ? MIN_SCALE_VALUE : newScale
      setStageScale({
        stageX: -(mousePointTo.x - position.x / newScale) * newScale,
        stageY: -(mousePointTo.y - position.y / newScale) * newScale,
        scale: newScale,
      })
    }
  }, [])

  const alertBeforeUnload = (ev: BeforeUnloadEvent) => {
    return (ev.returnValue = ' ')
  }

  const alertAfterUnload = (ev: Event): void => {
    void handleSelectedSeatSync(Array.from(seatsInStore).filter((sn) => slotStates[sn] === SlotStatus.OCCUPIED))

    return
  }

  useEffect(() => {
    const scaleOnload: { x: number; y: number } = { x: 0, y: 0 }

    img.onload = () => {
      scaleOnload.x = CANVAS_SIZE / img.width
      scaleOnload.y = CANVAS_SIZE / img.height
      setSeatScale(scaleOnload)
    }

    const backListener = history.listen((location, action) => {
      if (action === 'POP') {
        handleSelectedSeat(Array.from(seatsInStore).filter((sn) => slotStates[sn] === SlotStatus.OCCUPIED))
      }
    })
    window.addEventListener('beforeunload', alertBeforeUnload)
    window.addEventListener('unload', alertAfterUnload)

    return () => {
      backListener()
      window.removeEventListener('beforeunload', alertBeforeUnload)
      window.removeEventListener('unload', alertAfterUnload)
    }
  }, [slotMap])

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
        onClick={() => onPress([slot.number])}
      ></Rect>
    )
  },
)

export default Canvas
