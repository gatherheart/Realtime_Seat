import { Button } from '@material-ui/core'
import React from 'react'
import { SlotStatus } from '../../interface'

interface IProps {
  status?: SlotStatus
  number?: string
}

export default React.memo((props: IProps) => {
  const { status = SlotStatus.FREE, number = 0 } = props
  // To-do: Optimization for re-rendering issue
  return <Button color={status == SlotStatus.FREE ? 'primary' : 'secondary'}>Seat</Button>
})
