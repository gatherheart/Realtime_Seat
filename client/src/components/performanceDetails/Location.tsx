import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../reducer'

export default function Location() {
  const { location } = useSelector((state: State) => state.data)
  return <>{location}</>
}
