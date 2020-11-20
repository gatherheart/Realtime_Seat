import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useQuery } from '@apollo/client'

import { IBizItemInfo } from '../interface'
import Performance from '../components/performance/Performance'
import BookingSchedule from '../components/bookingSchedule/BookingSchedule'
import PerformanceDetails from '../components/performanceDetails/PerformanceDetails'
import { actions } from '../reducer'

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
    },
  )
  useEffect(() => {
    if (!getBizItemInfo) return
    dispatch(
      actions.setState({
        id: variables.bizItemId,
        name: getBizItemInfo.name,
        desc: getBizItemInfo.desc,
        extraDesc: getBizItemInfo.extraDescJson,
      }),
    )
  }, [getBizItemInfo])

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
