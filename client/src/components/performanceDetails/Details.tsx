import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../reducer'

export default function Details() {
  const { details } = useSelector((state: State) => state.data)
  return <>{details}</>
}
