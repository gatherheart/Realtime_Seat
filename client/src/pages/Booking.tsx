import React from 'react'
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useQuery } from '@apollo/client'

import { IBizItem, IBizItemInfo, IPerformanceTime } from '../interface'
import Performance from '../components/performance/Performance'
import BookingSchedule from '../components/bookingSchedule/BookingSchedule'
import PerformanceDetails from '../components/performanceDetails/PerformanceDetails'
import { actions } from '../reducer'

const GET_LIST_OF_BIZ_ITEMS = gql`
  query getListOfBizItems {
    getListOfBizItems {
      bizItemId
      slotMapId
    }
  }
`

const GET_BIZ_ITEM_INFO = gql`
  query getBizItemInfo($bizItemId: String!) {
    getBizItemInfo(bizItemId: $bizItemId)
  }
`

const useStyles = makeStyles((theme) => ({
  container: {
    borderColor: theme.palette.primary.main,
    borderWidth: 3,
    borderStyle: 'solid',
    minWidth: 320,
  },
}))

export default function Booking() {
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const classes = useStyles()
  const variables = useParams<{ bizItemId: string }>()
  const { data: { getBizItemInfo } = {} } = useQuery<{ getBizItemInfo: IBizItemInfo }, { bizItemId: string }>(
    GET_BIZ_ITEM_INFO,
    {
      variables,
      skip: !variables,
      onCompleted: () => {
        if (!getBizItemInfo) return

        dispatch(
          actions.setState({
            id: variables.bizItemId,
            name: getBizItemInfo.name,
            desc: getBizItemInfo.desc,
            extraDesc: getBizItemInfo.extraDescJson,
            address: getBizItemInfo.addressJson,
          }),
        )
      },
    },
  )

  const { data: { getListOfBizItems } = {} } = useQuery<{ getListOfBizItems: IBizItem[] }>(GET_LIST_OF_BIZ_ITEMS, {
    onCompleted: () => {
      // Dummy date
      const days = [new Date(), new Date()]
      days[0].setDate(days[0].getDate() + 1)
      days[0].setHours(19, 0, 0, 0)
      days[1].setDate(days[1].getDate() + 2)
      days[1].setHours(20, 30, 0, 0)
      let times: IPerformanceTime[] = []
      if (Array.isArray(getListOfBizItems) && Array.isArray(getListOfBizItems[0].slotMapId)) {
        times = getListOfBizItems[0].slotMapId.map((id, idx) => ({ date: days[idx], slotMapId: id }))
      }

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
        <Route exact path={match.path} component={Performance} />
        <Route path={`${match.path}/:bizItemId`} component={BookingSchedule} />
      </Switch>
      <PerformanceDetails />
    </Container>
  )
}
