import React from 'react'
import { useSelector } from 'react-redux'

import { IState } from '../../interface'

export default function Location() {
  const { address } = useSelector((state: IState) => state)
  return (
    <>
      {address?.address}
      {address?.placeName}
    </>
  )
}
