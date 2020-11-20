import React from 'react'
import { useHistory } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

import { IBizItem } from '../interface'

const GET_LIST_OF_BIZ_ITEMS = gql`
  query getListOfBizItems {
    getListOfBizItems {
      bizItemId
    }
  }
`

export default function Home() {
  const history = useHistory()
  const { data: { getListOfBizItems } = {} } = useQuery<{ getListOfBizItems: IBizItem[] }>(GET_LIST_OF_BIZ_ITEMS)
  let bizItemId = ''
  if (Array.isArray(getListOfBizItems)) bizItemId = getListOfBizItems[0].bizItemId

  return <div onClick={() => history.push(`booking/${bizItemId}`)}>select performance</div>
}
