import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

import TicketDetails from './TicketDetails'
import { IPerformanceTime } from '../../interface'

const useStyles = makeStyles(() => ({
  time: {
    display: 'inline-block',
    height: '3rem',
    width: '5rem',
    fontSize: '1rem',
    justifyContent: 'center',
    backgroundColor: '#E0FED3',
  },
}))

interface Props {
  performanceTimes: IPerformanceTime[]
}

export default function Times({ performanceTimes }: Props) {
  const classes = useStyles()
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    setCurrentId(performanceTimes[0].slotMapId)
  }, [performanceTimes])

  const handleClickTime = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    setCurrentId((e.target as HTMLDivElement).id)

  const times = performanceTimes.map(({ date, slotMapId }) => (
    <div className={classes.time} key={slotMapId} id={slotMapId} onClick={handleClickTime}>
      {format(date, 'HH:mm', { locale: ko })}
    </div>
  ))

  return (
    <>
      <div>{times}</div>
      <TicketDetails slotMapId={currentId} />
    </>
  )
}
