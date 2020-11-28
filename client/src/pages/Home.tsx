import React from 'react'
import { useHistory } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

import { IBizItem } from '../interface'

const GET_BIZ_ITEMS = gql`
  query getBizItems {
    bizItems {
      bizItemId
    }
  }
`

export default function Home() {
  const history = useHistory()
  const { data: { bizItems } = {} } = useQuery<{ bizItems: IBizItem[] }>(GET_BIZ_ITEMS)
  const bizItemId = bizItems?.[0].bizItemId || ''

  return <div onClick={() => history.push(`booking/${bizItemId}`)}>select performance</div>
}
