export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type BizItem = {
  __typename?: 'BizItem';
  businessId?: Maybe<Scalars['String']>;
  bizItemId?: Maybe<Scalars['String']>;
  slotMapIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createBizItem: Array<Maybe<BizItem>>;
  sample1: SampleMessage;
  sample2: Slot;
  updateSlots: Array<Maybe<Slot>>;
  syncSlots: Array<Maybe<Slot>>;
};


export type MutationCreateBizItemArgs = {
  bizItemId: Scalars['String'];
  businessId: Scalars['String'];
  slotMapIds: Array<Maybe<Scalars['String']>>;
};


export type MutationSample1Args = {
  channel: Scalars['String'];
  text: Scalars['String'];
};


export type MutationSample2Args = {
  slotId: Scalars['String'];
  view: Scalars['String'];
  typeName: Scalars['String'];
};


export type MutationUpdateSlotsArgs = {
  bizItemId: Scalars['String'];
  slotMapId: Scalars['String'];
  numbers: Array<Maybe<Scalars['String']>>;
  status: SlotStatus;
};


export type MutationSyncSlotsArgs = {
  bizItemId: Scalars['String'];
  slotMapId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bizItemDetails: Scalars['JSON'];
  bizItems: Array<Maybe<BizItem>>;
  bizItem: BizItem;
  sample1: Scalars['String'];
  sample2: Slot;
  slot: Slot;
  slots: Array<Maybe<Slot>>;
};


export type QueryBizItemDetailsArgs = {
  bizItemId: Scalars['String'];
};


export type QueryBizItemArgs = {
  bizItemId: Scalars['String'];
};


export type QuerySample1Args = {
  name: Scalars['String'];
};


export type QuerySample2Args = {
  slotId: Scalars['String'];
};


export type QuerySlotArgs = {
  bizItemId: Scalars['String'];
  slotMapId: Scalars['String'];
  number: Scalars['String'];
};


export type QuerySlotsArgs = {
  bizItemId: Scalars['String'];
  slotMapId: Scalars['String'];
};

export type SampleMessage = {
  __typename?: 'SampleMessage';
  channel: Scalars['String'];
  text: Scalars['String'];
};

export type Slot = {
  __typename?: 'Slot';
  bizItemId?: Maybe<Scalars['String']>;
  slotMapId?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  view?: Maybe<Scalars['String']>;
  status?: Maybe<SlotStatus>;
  typeName?: Maybe<Scalars['String']>;
};

export enum SlotStatus {
  Free = 'FREE',
  Occupied = 'OCCUPIED',
  Sold = 'SOLD'
}

export type Subscription = {
  __typename?: 'Subscription';
  sample1: SampleMessage;
};


export type SubscriptionSample1Args = {
  channel: Scalars['String'];
};
