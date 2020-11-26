import React from 'react'
import { Switch, Route, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useQuery } from '@apollo/client'

import { IBizItem, IBizItemDetails } from '../interface'
import Performance from '../components/performance/Performance'
import BookingSchedule from '../components/bookingSchedule/BookingSchedule'
import PerformanceDetails from '../components/performanceDetails/PerformanceDetails'
import { actions } from '../reducer'

const GET_BIZ_ITEMS = gql`
  query getBizItems {
    bizItems {
      bizItemId
      slotMapIds
    }
  }
`

const GET_BIZ_ITEM_DETAILS = gql`
  query getBizItemDetails($bizItemId: String!) {
    bizItemDetails(bizItemId: $bizItemId)
  }
`

const useStyles = makeStyles(() => ({
  container: {
    minWidth: 320,
    backgroundColor: 'white',
  },
}))

export default function Booking() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const variables = useParams<{ bizItemId: string }>()
  const { data: { bizItemDetails } = {} } = useQuery<{ bizItemDetails: IBizItemDetails }, { bizItemId: string }>(
    GET_BIZ_ITEM_DETAILS,
    {
      variables,
      skip: !variables,
      onCompleted: () => {
        if (!bizItemDetails) return
        const { name, desc, extraDescJson, addressJson } = bizItemDetails

        dispatch(actions.setState({ name, desc, extraDesc: extraDescJson, address: addressJson }))
      },
    },
  )

  const { data: { bizItems } = {} } = useQuery<{ bizItems: IBizItem[] }>(GET_BIZ_ITEMS, {
    onCompleted: () => {
      // Dummy date
      const days = [new Date(), new Date(), new Date()]
      days[0].setDate(days[0].getDate() + 1)
      days[0].setHours(19, 0, 0, 0)
      days[1].setDate(days[1].getDate() + 1)
      days[1].setHours(20, 30, 0, 0)
      days[2].setDate(days[2].getDate() + 2)
      days[2].setHours(20, 30, 0, 0)

      const times = bizItems?.[0].slotMapIds?.map((id, idx) => ({ date: days[idx], slotMapId: id })) ?? []
      times.push({ date: days[2], slotMapId: bizItems?.[0].slotMapIds[1] as string })

      dispatch(
        actions.setState({
          performanceTimes: times,
        }),
      )
    },
  })

  return (
    <Container maxWidth="md" className={classes.container}>
      <Switch>
        <Route exact path={'/booking/:bizItemId'} component={Performance} />
        <Route path={'/booking/:bizItemId/schedule'} component={BookingSchedule} />
      </Switch>
      <PerformanceDetails />
    </Container>
  )
}
