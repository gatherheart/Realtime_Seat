import * as fetch from 'node-fetch'
import { BOOKING_BASE_URL } from '../constant/url'

interface GetBizItemDetailsArgs {
  businessId: string
  bizItemId: string
}

export interface GetSlotInfoArgs extends GetBizItemDetailsArgs {
  slotMapId: string
}

function getAnyData(url: string) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error('[ERROR] cannot bring data from Booking-Web ' + response.statusText)
    }
    return response.json()
  })
}

export const getSlotInfo = async ({ businessId, bizItemId, slotMapId }: GetSlotInfoArgs) => {
  const slots = await getAnyData(
    BOOKING_BASE_URL +
      `/businesses/${businessId}/biz-items/${bizItemId}/slots/${slotMapId}/seats?status=WITH_AGENCY_OCCUPIED`,
  )
  return slots
}

export const getBizItemDetails = async ({ businessId, bizItemId }: GetBizItemDetailsArgs) => {
  const bizItemInfo = await getAnyData(BOOKING_BASE_URL + `/businesses/${businessId}/biz-items/${bizItemId}`)
  return bizItemInfo
}
