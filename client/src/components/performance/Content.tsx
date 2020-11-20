import React from 'react'
import { useSelector } from 'react-redux'

import { IState } from '../../interface'

export default function Content() {
  const { name, desc } = useSelector((state: IState) => state)

  return (
    <>
      <h2>{name}</h2>
      <p>{desc}</p>
    </>
  )
}
