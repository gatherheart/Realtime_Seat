import React from 'react'

import { IExtraDesc } from '../../interface'

export default function ExtraDesc({ title, context, images }: IExtraDesc) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{context}</p>
      <div>{images?.length > 0 && <img src={images[0].src} />}</div>
    </div>
  )
}
