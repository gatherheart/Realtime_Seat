import React from 'react'
import { useSelector } from 'react-redux'
import { IState } from '../../interface'

export default function Location() {
  const { location } = useSelector((state: IState) => state)
  return <>{location}</>
}
