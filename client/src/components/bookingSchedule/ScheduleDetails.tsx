import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Calendar, { CalendarTileProperties } from 'react-calendar'
import { differenceInCalendarDays } from 'date-fns'

import Times from './Times'
import { IState, IPerformanceTime } from '../../interface'

export default function ScheduleDetails() {
  const [times, setTimes] = useState<IPerformanceTime[]>([])
  const { performanceTimes } = useSelector((state: IState) => state)

  const tileDisabled = ({ date }: CalendarTileProperties) =>
    !performanceTimes?.some((time) => differenceInCalendarDays(time.date, date) === 0)

  const handleChangeCalendar = (date: Date | Date[]) => {
    const timesOfSelectedDay: IPerformanceTime[] =
      performanceTimes?.filter((time) => differenceInCalendarDays(time.date, date as Date) === 0) || []
    setTimes(timesOfSelectedDay)
  }

  return (
    <>
      <Calendar onChange={handleChangeCalendar} tileDisabled={tileDisabled} view="month" />
      {times.length > 0 && <Times performanceTimes={times} />}
    </>
  )
}
