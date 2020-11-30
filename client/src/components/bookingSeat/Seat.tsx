import { Button } from '@material-ui/core'
import React from 'react'
import { SlotStatus } from '../../interface'

interface IProps {
  status: SlotStatus
  number?: string
  onPress: (arg0: string) => void
}

export default React.memo((props: IProps) => {
  const { status = SlotStatus.FREE, number = '0', onPress } = props
  // To-do: Optimization for re-rendering issue
  return (
    <Button color={status == SlotStatus.FREE ? 'primary' : 'secondary'} onClick={() => onPress(number)}>
      Seat
    </Button>
  )
})
