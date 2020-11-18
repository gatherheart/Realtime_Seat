import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'

import { State } from '../../reducer'

const useStyle = makeStyles({
  poster: {},
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
})

export default function Poster() {
  const classes = useStyle()
  const img = useSelector((state: State) => state.data.thumbnail)

  return (
    <div className={classes.poster}>
      <img src={img} className={classes.img} />
    </div>
  )
}
