import React from 'react'
import { makeStyles } from '@material-ui/core'

import bookingNaver from '../../assets/booking-naver.png'

const useStyle = makeStyles({
  poster: {},
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
})

export default function Poster(): JSX.Element {
  const classes = useStyle()
  const defaultImg = bookingNaver

  return (
    <div className={classes.poster}>
      <img src={defaultImg} className={classes.img} />
    </div>
  )
}
