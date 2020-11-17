export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  JSON: any
}

export type BizItem = {
  __typename?: 'BizItem'
  businessId?: Maybe<Scalars['String']>
  bizItemId?: Maybe<Scalars['String']>
  slotMapId?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type BizItemInfoResponse = {
  __typename?: 'BizItemInfoResponse'
  error: Scalars['Boolean']
  errorMessage?: Maybe<Scalars['String']>
  bizItemInfo?: Maybe<Scalars['JSON']>
}

export type ListOfBizItemsResponse = {
  __typename?: 'ListOfBizItemsResponse'
  error: Scalars['Boolean']
  errorMessage?: Maybe<Scalars['String']>
  bizItems?: Maybe<Array<Maybe<BizItem>>>
}

export type Mutation = {
  __typename?: 'Mutation'
  sample1: SampleMessage
  sample2: Sample2Response
  synchronizationForSlot?: Maybe<Scalars['Boolean']>
}

export type MutationSample1Args = {
  channel: Scalars['String']
  text: Scalars['String']
}

export type MutationSample2Args = {
  slotId: Scalars['String']
  view: Scalars['String']
  typeName: Scalars['String']
}

export type MutationSynchronizationForSlotArgs = {
  bizItemId: Scalars['String']
  slotMapId: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  getBizItemInfo: BizItemInfoResponse
  getListOfBizItems: ListOfBizItemsResponse
  sample1: SampleResponse
  sample2: Sample2Response
}

export type QueryGetBizItemInfoArgs = {
  bizItemId: Scalars['String']
}

export type QuerySample1Args = {
  name: Scalars['String']
}

export type QuerySample2Args = {
  slotId: Scalars['String']
}

export type Sample2Response = {
  __typename?: 'Sample2Response'
  slot?: Maybe<Slot>
  errorMessage?: Maybe<Scalars['String']>
  error: Scalars['Boolean']
}

export type SampleMessage = {
  __typename?: 'SampleMessage'
  channel: Scalars['String']
  text: Scalars['String']
}

export type SampleResponse = {
  __typename?: 'SampleResponse'
  text: Scalars['String']
  error: Scalars['Boolean']
}

export type Slot = {
  __typename?: 'Slot'
  slotId: Scalars['String']
  view: Scalars['String']
  state?: Maybe<SlotState>
  typeName: Scalars['String']
}

export enum SlotState {
  Free = 'FREE',
  Occupied = 'OCCUPIED',
  Sold = 'SOLD',
}

export type Subscription = {
  __typename?: 'Subscription'
  sample1: SampleMessage
}

export type SubscriptionSample1Args = {
  channel: Scalars['String']
}
