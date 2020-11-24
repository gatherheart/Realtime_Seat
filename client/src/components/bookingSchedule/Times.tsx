import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

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

  const times = performanceTimes.map(({ date, slotMapId }) => {
    let hh = date.getHours().toString()
    let mm = date.getMinutes().toString()
    hh = hh.length > 1 ? hh : '0' + hh
    mm = mm.length > 1 ? mm : '0' + mm
    return <div className={classes.time} key={slotMapId} id={slotMapId} onClick={handleClickTime}>{`${hh}:${mm}`}</div>
  })

  return (
    <>
      <div>{times}</div>
      <TicketDetails slotMapId={currentId} />
    </>
  )
}
