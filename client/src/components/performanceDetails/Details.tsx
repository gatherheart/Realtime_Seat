import React from 'react'
import { useSelector } from 'react-redux'

import ExtraDesc from './ExtraDesc'
import { IState } from '../../interface'

export default function Details() {
  const { extraDesc } = useSelector((state: IState) => state)

  return (
    <>
      {Array.isArray(extraDesc) &&
        Array.isArray(extraDesc) &&
        extraDesc.map((p, idx) => <ExtraDesc {...p} key={idx} />)}
    </>
  )
}
