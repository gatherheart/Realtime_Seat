import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(() => ({
  img: {
    maxWidth: '100%',
  },
}))

import { IExtraDesc } from '../../interface'

export default function ExtraDesc({ title, context, images }: IExtraDesc) {
  const classes = useStyle()
  return (
    <div>
      <h2>{title}</h2>
      <p>{context}</p>
      <div>{images?.length > 0 && <img src={images[0].src} className={classes.img} />}</div>
    </div>
  )
}
