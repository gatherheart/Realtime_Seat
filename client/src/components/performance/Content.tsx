import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'

import { State } from '../../reducer'

export default function Content() {
  const data = useSelector((state: State) => state.data)
  const { name, startDate, endDate, address } = data

  return (
    <>
      <Typography variant="h3">{name}</Typography>
      <Typography>
        {startDate.toISOString().slice(0, 10)} ~ {endDate.toISOString().slice(0, 10)}
      </Typography>
      <Typography>{address}</Typography>
    </>
  )
}
