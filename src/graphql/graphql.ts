/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  contract_type: { input: any; output: any; }
  event_type: { input: any; output: any; }
  json: { input: any; output: any; }
  numeric: { input: string; output: string; }
  timestamp: { input: any; output: any; }
};

/** columns and relationships of "Account" */
export type Account = {
  __typename?: 'Account';
  /** An array relationship */
  approvals: Array<Approval>;
  balance: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
};


/** columns and relationships of "Account" */
export type AccountApprovalsArgs = {
  distinct_on?: InputMaybe<Array<Approval_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Approval_Order_By>>;
  where?: InputMaybe<Approval_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "Account". All fields are combined with a logical 'AND'. */
export type Account_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Bool_Exp>>;
  _not?: InputMaybe<Account_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Bool_Exp>>;
  approvals?: InputMaybe<Approval_Bool_Exp>;
  balance?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Account". */
export type Account_Order_By = {
  approvals_aggregate?: InputMaybe<Approval_Aggregate_Order_By>;
  balance?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "Account" */
export enum Account_Select_Column {
  /** column name */
  Balance = 'balance',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "Account" */
export type Account_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Stream_Cursor_Value_Input = {
  balance?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "Approval" */
export type Approval = {
  __typename?: 'Approval';
  amount: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  owner?: Maybe<Account>;
  owner_id: Scalars['String']['output'];
  /** An object relationship */
  spender?: Maybe<Account>;
  spender_id: Scalars['String']['output'];
};

/** order by aggregate values of table "Approval" */
export type Approval_Aggregate_Order_By = {
  avg?: InputMaybe<Approval_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Approval_Max_Order_By>;
  min?: InputMaybe<Approval_Min_Order_By>;
  stddev?: InputMaybe<Approval_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Approval_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Approval_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Approval_Sum_Order_By>;
  var_pop?: InputMaybe<Approval_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Approval_Var_Samp_Order_By>;
  variance?: InputMaybe<Approval_Variance_Order_By>;
};

/** order by avg() on columns of table "Approval" */
export type Approval_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Approval". All fields are combined with a logical 'AND'. */
export type Approval_Bool_Exp = {
  _and?: InputMaybe<Array<Approval_Bool_Exp>>;
  _not?: InputMaybe<Approval_Bool_Exp>;
  _or?: InputMaybe<Array<Approval_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  owner?: InputMaybe<Account_Bool_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  spender?: InputMaybe<Account_Bool_Exp>;
  spender_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "Approval" */
export type Approval_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  spender_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Approval" */
export type Approval_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  spender_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Approval". */
export type Approval_Order_By = {
  amount?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner?: InputMaybe<Account_Order_By>;
  owner_id?: InputMaybe<Order_By>;
  spender?: InputMaybe<Account_Order_By>;
  spender_id?: InputMaybe<Order_By>;
};

/** select columns of table "Approval" */
export enum Approval_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  SpenderId = 'spender_id'
}

/** order by stddev() on columns of table "Approval" */
export type Approval_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "Approval" */
export type Approval_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "Approval" */
export type Approval_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Approval" */
export type Approval_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Approval_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Approval_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
  spender_id?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "Approval" */
export type Approval_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "Approval" */
export type Approval_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "Approval" */
export type Approval_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "Approval" */
export type Approval_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** columns and relationships of "Position" */
export type Position = {
  __typename?: 'Position';
  assets: Scalars['numeric']['output'];
  borrowFeeAmount?: Maybe<Scalars['numeric']['output']>;
  borrowFeeIntegral: Scalars['numeric']['output'];
  closePrice?: Maybe<Scalars['numeric']['output']>;
  closeTimestamp?: Maybe<Scalars['numeric']['output']>;
  closeValue?: Maybe<Scalars['numeric']['output']>;
  collateral: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  direction: Scalars['numeric']['output'];
  entryPrice: Scalars['numeric']['output'];
  entryTimestamp: Scalars['numeric']['output'];
  entryVolume: Scalars['numeric']['output'];
  fundingFeeAmount?: Maybe<Scalars['numeric']['output']>;
  fundingFeeIntegral: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  isOpen: Scalars['Boolean']['output'];
  /** An object relationship */
  owner?: Maybe<User>;
  owner_id: Scalars['String']['output'];
  pnl?: Maybe<Scalars['numeric']['output']>;
  totalPnL?: Maybe<Scalars['numeric']['output']>;
};

/** order by aggregate values of table "Position" */
export type Position_Aggregate_Order_By = {
  avg?: InputMaybe<Position_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Position_Max_Order_By>;
  min?: InputMaybe<Position_Min_Order_By>;
  stddev?: InputMaybe<Position_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Position_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Position_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Position_Sum_Order_By>;
  var_pop?: InputMaybe<Position_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Position_Var_Samp_Order_By>;
  variance?: InputMaybe<Position_Variance_Order_By>;
};

/** order by avg() on columns of table "Position" */
export type Position_Avg_Order_By = {
  assets?: InputMaybe<Order_By>;
  borrowFeeAmount?: InputMaybe<Order_By>;
  borrowFeeIntegral?: InputMaybe<Order_By>;
  closePrice?: InputMaybe<Order_By>;
  closeTimestamp?: InputMaybe<Order_By>;
  closeValue?: InputMaybe<Order_By>;
  collateral?: InputMaybe<Order_By>;
  direction?: InputMaybe<Order_By>;
  entryPrice?: InputMaybe<Order_By>;
  entryTimestamp?: InputMaybe<Order_By>;
  entryVolume?: InputMaybe<Order_By>;
  fundingFeeAmount?: InputMaybe<Order_By>;
  fundingFeeIntegral?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  totalPnL?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Position". All fields are combined with a logical 'AND'. */
export type Position_Bool_Exp = {
  _and?: InputMaybe<Array<Position_Bool_Exp>>;
  _not?: InputMaybe<Position_Bool_Exp>;
  _or?: InputMaybe<Array<Position_Bool_Exp>>;
  assets?: InputMaybe<Numeric_Comparison_Exp>;
  borrowFeeAmount?: InputMaybe<Numeric_Comparison_Exp>;
  borrowFeeIntegral?: InputMaybe<Numeric_Comparison_Exp>;
  closePrice?: InputMaybe<Numeric_Comparison_Exp>;
  closeTimestamp?: InputMaybe<Numeric_Comparison_Exp>;
  closeValue?: InputMaybe<Numeric_Comparison_Exp>;
  collateral?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  direction?: InputMaybe<Numeric_Comparison_Exp>;
  entryPrice?: InputMaybe<Numeric_Comparison_Exp>;
  entryTimestamp?: InputMaybe<Numeric_Comparison_Exp>;
  entryVolume?: InputMaybe<Numeric_Comparison_Exp>;
  fundingFeeAmount?: InputMaybe<Numeric_Comparison_Exp>;
  fundingFeeIntegral?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  isOpen?: InputMaybe<Boolean_Comparison_Exp>;
  owner?: InputMaybe<User_Bool_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  pnl?: InputMaybe<Numeric_Comparison_Exp>;
  totalPnL?: InputMaybe<Numeric_Comparison_Exp>;
};

/** order by max() on columns of table "Position" */
export type Position_Max_Order_By = {
  assets?: InputMaybe<Order_By>;
  borrowFeeAmount?: InputMaybe<Order_By>;
  borrowFeeIntegral?: InputMaybe<Order_By>;
  closePrice?: InputMaybe<Order_By>;
  closeTimestamp?: InputMaybe<Order_By>;
  closeValue?: InputMaybe<Order_By>;
  collateral?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  direction?: InputMaybe<Order_By>;
  entryPrice?: InputMaybe<Order_By>;
  entryTimestamp?: InputMaybe<Order_By>;
  entryVolume?: InputMaybe<Order_By>;
  fundingFeeAmount?: InputMaybe<Order_By>;
  fundingFeeIntegral?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  totalPnL?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Position" */
export type Position_Min_Order_By = {
  assets?: InputMaybe<Order_By>;
  borrowFeeAmount?: InputMaybe<Order_By>;
  borrowFeeIntegral?: InputMaybe<Order_By>;
  closePrice?: InputMaybe<Order_By>;
  closeTimestamp?: InputMaybe<Order_By>;
  closeValue?: InputMaybe<Order_By>;
  collateral?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  direction?: InputMaybe<Order_By>;
  entryPrice?: InputMaybe<Order_By>;
  entryTimestamp?: InputMaybe<Order_By>;
  entryVolume?: InputMaybe<Order_By>;
  fundingFeeAmount?: InputMaybe<Order_By>;
  fundingFeeIntegral?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  totalPnL?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Position". */
export type Position_Order_By = {
  assets?: InputMaybe<Order_By>;
  borrowFeeAmount?: InputMaybe<Order_By>;
  borrowFeeIntegral?: InputMaybe<Order_By>;
  closePrice?: InputMaybe<Order_By>;
  closeTimestamp?: InputMaybe<Order_By>;
  closeValue?: InputMaybe<Order_By>;
  collateral?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  direction?: InputMaybe<Order_By>;
  entryPrice?: InputMaybe<Order_By>;
  entryTimestamp?: InputMaybe<Order_By>;
  entryVolume?: InputMaybe<Order_By>;
  fundingFeeAmount?: InputMaybe<Order_By>;
  fundingFeeIntegral?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isOpen?: InputMaybe<Order_By>;
  owner?: InputMaybe<User_Order_By>;
  owner_id?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  totalPnL?: InputMaybe<Order_By>;
};

/** select columns of table "Position" */
export enum Position_Select_Column {
  /** column name */
  Assets = 'assets',
  /** column name */
  BorrowFeeAmount = 'borrowFeeAmount',
  /** column name */
  BorrowFeeIntegral = 'borrowFeeIntegral',
  /** column name */
  ClosePrice = 'closePrice',
  /** column name */
  CloseTimestamp = 'closeTimestamp',
  /** column name */
  CloseValue = 'closeValue',
  /** column name */
  Collateral = 'collateral',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Direction = 'direction',
  /** column name */
  EntryPrice = 'entryPrice',
  /** column name */
  EntryTimestamp = 'entryTimestamp',
  /** column name */
  EntryVolume = 'entryVolume',
  /** column name */
  FundingFeeAmount = 'fundingFeeAmount',
  /** column name */
  FundingFeeIntegral = 'fundingFeeIntegral',
  /** column name */
  Id = 'id',
  /** column name */
  IsOpen = 'isOpen',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Pnl = 'pnl',
  /** column name */
  TotalPnL = 'totalPnL'
}

/** order by stddev() on columns of table "Position" */
export type Position_Stddev_Order_By = {
  assets?: InputMaybe<Order_By>;
  borrowFeeAmount?: InputMaybe<Order_By>;
  borrowFeeIntegral?: InputMaybe<Order_By>;
  closePrice?: InputMaybe<Order_By>;
  closeTimestamp?: InputMaybe<Order_By>;
  closeValue?: InputMaybe<Order_By>;
  collateral?: InputMaybe<Order_By>;
  direction?: InputMaybe<Order_By>;
  entryPrice?: InputMaybe<Order_By>;
  entryTimestamp?: InputMaybe<Order_By>;
  entryVolume?: InputMaybe<Order_By>;
  fundingFeeAmount?: InputMaybe<Order_By>;
  fundingFeeIntegral?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  totalPnL?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "Position" */
export type Position_Stddev_Pop_Order_By = {
  assets?: InputMaybe<Order_By>;
  borrowFeeAmount?: InputMaybe<Order_By>;
  borrowFeeIntegral?: InputMaybe<Order_By>;
  closePrice?: InputMaybe<Order_By>;
  closeTimestamp?: InputMaybe<Order_By>;
  closeValue?: InputMaybe<Order_By>;
  collateral?: InputMaybe<Order_By>;
  direction?: InputMaybe<Order_By>;
  entryPrice?: InputMaybe<Order_By>;
  entryTimestamp?: InputMaybe<Order_By>;
  entryVolume?: InputMaybe<Order_By>;
  fundingFeeAmount?: InputMaybe<Order_By>;
  fundingFeeIntegral?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  totalPnL?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "Position" */
export type Position_Stddev_Samp_Order_By = {
  assets?: InputMaybe<Order_By>;
  borrowFeeAmount?: InputMaybe<Order_By>;
  borrowFeeIntegral?: InputMaybe<Order_By>;
  closePrice?: InputMaybe<Order_By>;
  closeTimestamp?: InputMaybe<Order_By>;
  closeValue?: InputMaybe<Order_By>;
  collateral?: InputMaybe<Order_By>;
  direction?: InputMaybe<Order_By>;
  entryPrice?: InputMaybe<Order_By>;
  entryTimestamp?: InputMaybe<Order_By>;
  entryVolume?: InputMaybe<Order_By>;
  fundingFeeAmount?: InputMaybe<Order_By>;
  fundingFeeIntegral?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  totalPnL?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Position" */
export type Position_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Position_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Position_Stream_Cursor_Value_Input = {
  assets?: InputMaybe<Scalars['numeric']['input']>;
  borrowFeeAmount?: InputMaybe<Scalars['numeric']['input']>;
  borrowFeeIntegral?: InputMaybe<Scalars['numeric']['input']>;
  closePrice?: InputMaybe<Scalars['numeric']['input']>;
  closeTimestamp?: InputMaybe<Scalars['numeric']['input']>;
  closeValue?: InputMaybe<Scalars['numeric']['input']>;
  collateral?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  direction?: InputMaybe<Scalars['numeric']['input']>;
  entryPrice?: InputMaybe<Scalars['numeric']['input']>;
  entryTimestamp?: InputMaybe<Scalars['numeric']['input']>;
  entryVolume?: InputMaybe<Scalars['numeric']['input']>;
  fundingFeeAmount?: InputMaybe<Scalars['numeric']['input']>;
  fundingFeeIntegral?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isOpen?: InputMaybe<Scalars['Boolean']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
  pnl?: InputMaybe<Scalars['numeric']['input']>;
  totalPnL?: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "Position" */
export type Position_Sum_Order_By = {
  assets?: InputMaybe<Order_By>;
  borrowFeeAmount?: InputMaybe<Order_By>;
  borrowFeeIntegral?: InputMaybe<Order_By>;
  closePrice?: InputMaybe<Order_By>;
  closeTimestamp?: InputMaybe<Order_By>;
  closeValue?: InputMaybe<Order_By>;
  collateral?: InputMaybe<Order_By>;
  direction?: InputMaybe<Order_By>;
  entryPrice?: InputMaybe<Order_By>;
  entryTimestamp?: InputMaybe<Order_By>;
  entryVolume?: InputMaybe<Order_By>;
  fundingFeeAmount?: InputMaybe<Order_By>;
  fundingFeeIntegral?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  totalPnL?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "Position" */
export type Position_Var_Pop_Order_By = {
  assets?: InputMaybe<Order_By>;
  borrowFeeAmount?: InputMaybe<Order_By>;
  borrowFeeIntegral?: InputMaybe<Order_By>;
  closePrice?: InputMaybe<Order_By>;
  closeTimestamp?: InputMaybe<Order_By>;
  closeValue?: InputMaybe<Order_By>;
  collateral?: InputMaybe<Order_By>;
  direction?: InputMaybe<Order_By>;
  entryPrice?: InputMaybe<Order_By>;
  entryTimestamp?: InputMaybe<Order_By>;
  entryVolume?: InputMaybe<Order_By>;
  fundingFeeAmount?: InputMaybe<Order_By>;
  fundingFeeIntegral?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  totalPnL?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "Position" */
export type Position_Var_Samp_Order_By = {
  assets?: InputMaybe<Order_By>;
  borrowFeeAmount?: InputMaybe<Order_By>;
  borrowFeeIntegral?: InputMaybe<Order_By>;
  closePrice?: InputMaybe<Order_By>;
  closeTimestamp?: InputMaybe<Order_By>;
  closeValue?: InputMaybe<Order_By>;
  collateral?: InputMaybe<Order_By>;
  direction?: InputMaybe<Order_By>;
  entryPrice?: InputMaybe<Order_By>;
  entryTimestamp?: InputMaybe<Order_By>;
  entryVolume?: InputMaybe<Order_By>;
  fundingFeeAmount?: InputMaybe<Order_By>;
  fundingFeeIntegral?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  totalPnL?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "Position" */
export type Position_Variance_Order_By = {
  assets?: InputMaybe<Order_By>;
  borrowFeeAmount?: InputMaybe<Order_By>;
  borrowFeeIntegral?: InputMaybe<Order_By>;
  closePrice?: InputMaybe<Order_By>;
  closeTimestamp?: InputMaybe<Order_By>;
  closeValue?: InputMaybe<Order_By>;
  collateral?: InputMaybe<Order_By>;
  direction?: InputMaybe<Order_By>;
  entryPrice?: InputMaybe<Order_By>;
  entryTimestamp?: InputMaybe<Order_By>;
  entryVolume?: InputMaybe<Order_By>;
  fundingFeeAmount?: InputMaybe<Order_By>;
  fundingFeeIntegral?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  totalPnL?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "User" */
export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  /** An array relationship */
  positions: Array<Position>;
};


/** columns and relationships of "User" */
export type UserPositionsArgs = {
  distinct_on?: InputMaybe<Array<Position_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Position_Order_By>>;
  where?: InputMaybe<Position_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "User". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  positions?: InputMaybe<Position_Bool_Exp>;
};

/** Ordering options when selecting data from "User". */
export type User_Order_By = {
  address?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  positions_aggregate?: InputMaybe<Position_Aggregate_Order_By>;
};

/** select columns of table "User" */
export enum User_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "User" */
export type User_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "chain_metadata" */
export type Chain_Metadata = {
  __typename?: 'chain_metadata';
  block_height: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
  first_event_block_number?: Maybe<Scalars['Int']['output']>;
  latest_processed_block?: Maybe<Scalars['Int']['output']>;
  num_events_processed?: Maybe<Scalars['Int']['output']>;
  start_block: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "chain_metadata". All fields are combined with a logical 'AND'. */
export type Chain_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Chain_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Chain_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Chain_Metadata_Bool_Exp>>;
  block_height?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  first_event_block_number?: InputMaybe<Int_Comparison_Exp>;
  latest_processed_block?: InputMaybe<Int_Comparison_Exp>;
  num_events_processed?: InputMaybe<Int_Comparison_Exp>;
  start_block?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "chain_metadata". */
export type Chain_Metadata_Order_By = {
  block_height?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  first_event_block_number?: InputMaybe<Order_By>;
  latest_processed_block?: InputMaybe<Order_By>;
  num_events_processed?: InputMaybe<Order_By>;
  start_block?: InputMaybe<Order_By>;
};

/** select columns of table "chain_metadata" */
export enum Chain_Metadata_Select_Column {
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  FirstEventBlockNumber = 'first_event_block_number',
  /** column name */
  LatestProcessedBlock = 'latest_processed_block',
  /** column name */
  NumEventsProcessed = 'num_events_processed',
  /** column name */
  StartBlock = 'start_block'
}

/** Streaming cursor of the table "chain_metadata" */
export type Chain_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Chain_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Chain_Metadata_Stream_Cursor_Value_Input = {
  block_height?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  first_event_block_number?: InputMaybe<Scalars['Int']['input']>;
  latest_processed_block?: InputMaybe<Scalars['Int']['input']>;
  num_events_processed?: InputMaybe<Scalars['Int']['input']>;
  start_block?: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression to compare columns of type "contract_type". All fields are combined with logical 'AND'. */
export type Contract_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['contract_type']['input']>;
  _gt?: InputMaybe<Scalars['contract_type']['input']>;
  _gte?: InputMaybe<Scalars['contract_type']['input']>;
  _in?: InputMaybe<Array<Scalars['contract_type']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['contract_type']['input']>;
  _lte?: InputMaybe<Scalars['contract_type']['input']>;
  _neq?: InputMaybe<Scalars['contract_type']['input']>;
  _nin?: InputMaybe<Array<Scalars['contract_type']['input']>>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "dynamic_contract_registry" */
export type Dynamic_Contract_Registry = {
  __typename?: 'dynamic_contract_registry';
  chain_id: Scalars['Int']['output'];
  contract_address: Scalars['String']['output'];
  contract_type: Scalars['contract_type']['output'];
  event_id: Scalars['numeric']['output'];
};

/** Boolean expression to filter rows from the table "dynamic_contract_registry". All fields are combined with a logical 'AND'. */
export type Dynamic_Contract_Registry_Bool_Exp = {
  _and?: InputMaybe<Array<Dynamic_Contract_Registry_Bool_Exp>>;
  _not?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
  _or?: InputMaybe<Array<Dynamic_Contract_Registry_Bool_Exp>>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  contract_address?: InputMaybe<String_Comparison_Exp>;
  contract_type?: InputMaybe<Contract_Type_Comparison_Exp>;
  event_id?: InputMaybe<Numeric_Comparison_Exp>;
};

/** Ordering options when selecting data from "dynamic_contract_registry". */
export type Dynamic_Contract_Registry_Order_By = {
  chain_id?: InputMaybe<Order_By>;
  contract_address?: InputMaybe<Order_By>;
  contract_type?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
};

/** select columns of table "dynamic_contract_registry" */
export enum Dynamic_Contract_Registry_Select_Column {
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  ContractType = 'contract_type',
  /** column name */
  EventId = 'event_id'
}

/** Streaming cursor of the table "dynamic_contract_registry" */
export type Dynamic_Contract_Registry_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dynamic_Contract_Registry_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dynamic_Contract_Registry_Stream_Cursor_Value_Input = {
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  contract_address?: InputMaybe<Scalars['String']['input']>;
  contract_type?: InputMaybe<Scalars['contract_type']['input']>;
  event_id?: InputMaybe<Scalars['numeric']['input']>;
};

/** columns and relationships of "event_sync_state" */
export type Event_Sync_State = {
  __typename?: 'event_sync_state';
  block_number: Scalars['Int']['output'];
  block_timestamp: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
  log_index: Scalars['Int']['output'];
  transaction_index: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "event_sync_state". All fields are combined with a logical 'AND'. */
export type Event_Sync_State_Bool_Exp = {
  _and?: InputMaybe<Array<Event_Sync_State_Bool_Exp>>;
  _not?: InputMaybe<Event_Sync_State_Bool_Exp>;
  _or?: InputMaybe<Array<Event_Sync_State_Bool_Exp>>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  log_index?: InputMaybe<Int_Comparison_Exp>;
  transaction_index?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "event_sync_state". */
export type Event_Sync_State_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  transaction_index?: InputMaybe<Order_By>;
};

/** select columns of table "event_sync_state" */
export enum Event_Sync_State_Select_Column {
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  BlockTimestamp = 'block_timestamp',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  LogIndex = 'log_index',
  /** column name */
  TransactionIndex = 'transaction_index'
}

/** Streaming cursor of the table "event_sync_state" */
export type Event_Sync_State_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Event_Sync_State_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Event_Sync_State_Stream_Cursor_Value_Input = {
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  log_index?: InputMaybe<Scalars['Int']['input']>;
  transaction_index?: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression to compare columns of type "event_type". All fields are combined with logical 'AND'. */
export type Event_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['event_type']['input']>;
  _gt?: InputMaybe<Scalars['event_type']['input']>;
  _gte?: InputMaybe<Scalars['event_type']['input']>;
  _in?: InputMaybe<Array<Scalars['event_type']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['event_type']['input']>;
  _lte?: InputMaybe<Scalars['event_type']['input']>;
  _neq?: InputMaybe<Scalars['event_type']['input']>;
  _nin?: InputMaybe<Array<Scalars['event_type']['input']>>;
};

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']['input']>;
  _gt?: InputMaybe<Scalars['json']['input']>;
  _gte?: InputMaybe<Scalars['json']['input']>;
  _in?: InputMaybe<Array<Scalars['json']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['json']['input']>;
  _lte?: InputMaybe<Scalars['json']['input']>;
  _neq?: InputMaybe<Scalars['json']['input']>;
  _nin?: InputMaybe<Array<Scalars['json']['input']>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "persisted_state" */
export type Persisted_State = {
  __typename?: 'persisted_state';
  abi_files_hash: Scalars['String']['output'];
  config_hash: Scalars['String']['output'];
  envio_version: Scalars['String']['output'];
  handler_files_hash: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  schema_hash: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "persisted_state". All fields are combined with a logical 'AND'. */
export type Persisted_State_Bool_Exp = {
  _and?: InputMaybe<Array<Persisted_State_Bool_Exp>>;
  _not?: InputMaybe<Persisted_State_Bool_Exp>;
  _or?: InputMaybe<Array<Persisted_State_Bool_Exp>>;
  abi_files_hash?: InputMaybe<String_Comparison_Exp>;
  config_hash?: InputMaybe<String_Comparison_Exp>;
  envio_version?: InputMaybe<String_Comparison_Exp>;
  handler_files_hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  schema_hash?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "persisted_state". */
export type Persisted_State_Order_By = {
  abi_files_hash?: InputMaybe<Order_By>;
  config_hash?: InputMaybe<Order_By>;
  envio_version?: InputMaybe<Order_By>;
  handler_files_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  schema_hash?: InputMaybe<Order_By>;
};

/** select columns of table "persisted_state" */
export enum Persisted_State_Select_Column {
  /** column name */
  AbiFilesHash = 'abi_files_hash',
  /** column name */
  ConfigHash = 'config_hash',
  /** column name */
  EnvioVersion = 'envio_version',
  /** column name */
  HandlerFilesHash = 'handler_files_hash',
  /** column name */
  Id = 'id',
  /** column name */
  SchemaHash = 'schema_hash'
}

/** Streaming cursor of the table "persisted_state" */
export type Persisted_State_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Persisted_State_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Persisted_State_Stream_Cursor_Value_Input = {
  abi_files_hash?: InputMaybe<Scalars['String']['input']>;
  config_hash?: InputMaybe<Scalars['String']['input']>;
  envio_version?: InputMaybe<Scalars['String']['input']>;
  handler_files_hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  schema_hash?: InputMaybe<Scalars['String']['input']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "Account" */
  Account: Array<Account>;
  /** fetch data from the table: "Account" using primary key columns */
  Account_by_pk?: Maybe<Account>;
  /** fetch data from the table: "Approval" */
  Approval: Array<Approval>;
  /** fetch data from the table: "Approval" using primary key columns */
  Approval_by_pk?: Maybe<Approval>;
  /** fetch data from the table: "Position" */
  Position: Array<Position>;
  /** fetch data from the table: "Position" using primary key columns */
  Position_by_pk?: Maybe<Position>;
  /** fetch data from the table: "User" */
  User: Array<User>;
  /** fetch data from the table: "User" using primary key columns */
  User_by_pk?: Maybe<User>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<Chain_Metadata>;
  /** fetch data from the table: "chain_metadata" using primary key columns */
  chain_metadata_by_pk?: Maybe<Chain_Metadata>;
  /** fetch data from the table: "dynamic_contract_registry" */
  dynamic_contract_registry: Array<Dynamic_Contract_Registry>;
  /** fetch data from the table: "dynamic_contract_registry" using primary key columns */
  dynamic_contract_registry_by_pk?: Maybe<Dynamic_Contract_Registry>;
  /** fetch data from the table: "event_sync_state" */
  event_sync_state: Array<Event_Sync_State>;
  /** fetch data from the table: "event_sync_state" using primary key columns */
  event_sync_state_by_pk?: Maybe<Event_Sync_State>;
  /** fetch data from the table: "persisted_state" */
  persisted_state: Array<Persisted_State>;
  /** fetch data from the table: "persisted_state" using primary key columns */
  persisted_state_by_pk?: Maybe<Persisted_State>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<Raw_Events>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<Raw_Events>;
};


export type Query_RootAccountArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Query_RootAccount_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootApprovalArgs = {
  distinct_on?: InputMaybe<Array<Approval_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Approval_Order_By>>;
  where?: InputMaybe<Approval_Bool_Exp>;
};


export type Query_RootApproval_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootPositionArgs = {
  distinct_on?: InputMaybe<Array<Position_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Position_Order_By>>;
  where?: InputMaybe<Position_Bool_Exp>;
};


export type Query_RootPosition_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootChain_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Chain_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chain_Metadata_Order_By>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Query_RootChain_Metadata_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Query_RootDynamic_Contract_RegistryArgs = {
  distinct_on?: InputMaybe<Array<Dynamic_Contract_Registry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dynamic_Contract_Registry_Order_By>>;
  where?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Query_RootDynamic_Contract_Registry_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
  contract_address: Scalars['String']['input'];
};


export type Query_RootEvent_Sync_StateArgs = {
  distinct_on?: InputMaybe<Array<Event_Sync_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Sync_State_Order_By>>;
  where?: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Query_RootEvent_Sync_State_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Query_RootPersisted_StateArgs = {
  distinct_on?: InputMaybe<Array<Persisted_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Persisted_State_Order_By>>;
  where?: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Query_RootPersisted_State_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootRaw_EventsArgs = {
  distinct_on?: InputMaybe<Array<Raw_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Raw_Events_Order_By>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};


export type Query_RootRaw_Events_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
  event_id: Scalars['numeric']['input'];
};

/** columns and relationships of "raw_events" */
export type Raw_Events = {
  __typename?: 'raw_events';
  block_hash: Scalars['String']['output'];
  block_number: Scalars['Int']['output'];
  block_timestamp: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  event_id: Scalars['numeric']['output'];
  event_type: Scalars['event_type']['output'];
  log_index: Scalars['Int']['output'];
  params: Scalars['json']['output'];
  src_address: Scalars['String']['output'];
  transaction_hash: Scalars['String']['output'];
  transaction_index: Scalars['Int']['output'];
};


/** columns and relationships of "raw_events" */
export type Raw_EventsParamsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "raw_events". All fields are combined with a logical 'AND'. */
export type Raw_Events_Bool_Exp = {
  _and?: InputMaybe<Array<Raw_Events_Bool_Exp>>;
  _not?: InputMaybe<Raw_Events_Bool_Exp>;
  _or?: InputMaybe<Array<Raw_Events_Bool_Exp>>;
  block_hash?: InputMaybe<String_Comparison_Exp>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  event_id?: InputMaybe<Numeric_Comparison_Exp>;
  event_type?: InputMaybe<Event_Type_Comparison_Exp>;
  log_index?: InputMaybe<Int_Comparison_Exp>;
  params?: InputMaybe<Json_Comparison_Exp>;
  src_address?: InputMaybe<String_Comparison_Exp>;
  transaction_hash?: InputMaybe<String_Comparison_Exp>;
  transaction_index?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "raw_events". */
export type Raw_Events_Order_By = {
  block_hash?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  event_type?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  params?: InputMaybe<Order_By>;
  src_address?: InputMaybe<Order_By>;
  transaction_hash?: InputMaybe<Order_By>;
  transaction_index?: InputMaybe<Order_By>;
};

/** select columns of table "raw_events" */
export enum Raw_Events_Select_Column {
  /** column name */
  BlockHash = 'block_hash',
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  BlockTimestamp = 'block_timestamp',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  EventId = 'event_id',
  /** column name */
  EventType = 'event_type',
  /** column name */
  LogIndex = 'log_index',
  /** column name */
  Params = 'params',
  /** column name */
  SrcAddress = 'src_address',
  /** column name */
  TransactionHash = 'transaction_hash',
  /** column name */
  TransactionIndex = 'transaction_index'
}

/** Streaming cursor of the table "raw_events" */
export type Raw_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Raw_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Raw_Events_Stream_Cursor_Value_Input = {
  block_hash?: InputMaybe<Scalars['String']['input']>;
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  event_id?: InputMaybe<Scalars['numeric']['input']>;
  event_type?: InputMaybe<Scalars['event_type']['input']>;
  log_index?: InputMaybe<Scalars['Int']['input']>;
  params?: InputMaybe<Scalars['json']['input']>;
  src_address?: InputMaybe<Scalars['String']['input']>;
  transaction_hash?: InputMaybe<Scalars['String']['input']>;
  transaction_index?: InputMaybe<Scalars['Int']['input']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "Account" */
  Account: Array<Account>;
  /** fetch data from the table: "Account" using primary key columns */
  Account_by_pk?: Maybe<Account>;
  /** fetch data from the table in a streaming manner: "Account" */
  Account_stream: Array<Account>;
  /** fetch data from the table: "Approval" */
  Approval: Array<Approval>;
  /** fetch data from the table: "Approval" using primary key columns */
  Approval_by_pk?: Maybe<Approval>;
  /** fetch data from the table in a streaming manner: "Approval" */
  Approval_stream: Array<Approval>;
  /** fetch data from the table: "Position" */
  Position: Array<Position>;
  /** fetch data from the table: "Position" using primary key columns */
  Position_by_pk?: Maybe<Position>;
  /** fetch data from the table in a streaming manner: "Position" */
  Position_stream: Array<Position>;
  /** fetch data from the table: "User" */
  User: Array<User>;
  /** fetch data from the table: "User" using primary key columns */
  User_by_pk?: Maybe<User>;
  /** fetch data from the table in a streaming manner: "User" */
  User_stream: Array<User>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<Chain_Metadata>;
  /** fetch data from the table: "chain_metadata" using primary key columns */
  chain_metadata_by_pk?: Maybe<Chain_Metadata>;
  /** fetch data from the table in a streaming manner: "chain_metadata" */
  chain_metadata_stream: Array<Chain_Metadata>;
  /** fetch data from the table: "dynamic_contract_registry" */
  dynamic_contract_registry: Array<Dynamic_Contract_Registry>;
  /** fetch data from the table: "dynamic_contract_registry" using primary key columns */
  dynamic_contract_registry_by_pk?: Maybe<Dynamic_Contract_Registry>;
  /** fetch data from the table in a streaming manner: "dynamic_contract_registry" */
  dynamic_contract_registry_stream: Array<Dynamic_Contract_Registry>;
  /** fetch data from the table: "event_sync_state" */
  event_sync_state: Array<Event_Sync_State>;
  /** fetch data from the table: "event_sync_state" using primary key columns */
  event_sync_state_by_pk?: Maybe<Event_Sync_State>;
  /** fetch data from the table in a streaming manner: "event_sync_state" */
  event_sync_state_stream: Array<Event_Sync_State>;
  /** fetch data from the table: "persisted_state" */
  persisted_state: Array<Persisted_State>;
  /** fetch data from the table: "persisted_state" using primary key columns */
  persisted_state_by_pk?: Maybe<Persisted_State>;
  /** fetch data from the table in a streaming manner: "persisted_state" */
  persisted_state_stream: Array<Persisted_State>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<Raw_Events>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<Raw_Events>;
  /** fetch data from the table in a streaming manner: "raw_events" */
  raw_events_stream: Array<Raw_Events>;
};


export type Subscription_RootAccountArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Subscription_RootAccount_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccount_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Subscription_RootApprovalArgs = {
  distinct_on?: InputMaybe<Array<Approval_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Approval_Order_By>>;
  where?: InputMaybe<Approval_Bool_Exp>;
};


export type Subscription_RootApproval_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootApproval_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Approval_Stream_Cursor_Input>>;
  where?: InputMaybe<Approval_Bool_Exp>;
};


export type Subscription_RootPositionArgs = {
  distinct_on?: InputMaybe<Array<Position_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Position_Order_By>>;
  where?: InputMaybe<Position_Bool_Exp>;
};


export type Subscription_RootPosition_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootPosition_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Position_Stream_Cursor_Input>>;
  where?: InputMaybe<Position_Bool_Exp>;
};


export type Subscription_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootUser_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootChain_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Chain_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chain_Metadata_Order_By>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Subscription_RootChain_Metadata_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Subscription_RootChain_Metadata_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Chain_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Subscription_RootDynamic_Contract_RegistryArgs = {
  distinct_on?: InputMaybe<Array<Dynamic_Contract_Registry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dynamic_Contract_Registry_Order_By>>;
  where?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Subscription_RootDynamic_Contract_Registry_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
  contract_address: Scalars['String']['input'];
};


export type Subscription_RootDynamic_Contract_Registry_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Dynamic_Contract_Registry_Stream_Cursor_Input>>;
  where?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Subscription_RootEvent_Sync_StateArgs = {
  distinct_on?: InputMaybe<Array<Event_Sync_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Sync_State_Order_By>>;
  where?: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Subscription_RootEvent_Sync_State_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Subscription_RootEvent_Sync_State_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Event_Sync_State_Stream_Cursor_Input>>;
  where?: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Subscription_RootPersisted_StateArgs = {
  distinct_on?: InputMaybe<Array<Persisted_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Persisted_State_Order_By>>;
  where?: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Subscription_RootPersisted_State_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootPersisted_State_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Persisted_State_Stream_Cursor_Input>>;
  where?: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Subscription_RootRaw_EventsArgs = {
  distinct_on?: InputMaybe<Array<Raw_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Raw_Events_Order_By>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};


export type Subscription_RootRaw_Events_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
  event_id: Scalars['numeric']['input'];
};


export type Subscription_RootRaw_Events_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Raw_Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

export type UserPositionsSubscriptionVariables = Exact<{
  owner: Scalars['String']['input'];
}>;


export type UserPositionsSubscription = { __typename?: 'subscription_root', Position: Array<{ __typename?: 'Position', collateral: string, direction: string, entryVolume: string, entryPrice: string, entryTimestamp: string, closePrice?: string | null, totalPnL?: string | null, pnl?: string | null, borrowFeeAmount?: string | null, fundingFeeAmount?: string | null, id: string }> };

export type GetPositionsSubscriptionVariables = Exact<{
  owner: Scalars['String']['input'];
}>;


export type GetPositionsSubscription = { __typename?: 'subscription_root', Position: Array<{ __typename?: 'Position', collateral: string, direction: string, entryVolume: string, entryPrice: string, entryTimestamp: string, id: string }> };


export const UserPositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"UserPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owner"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Position"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"owner_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owner"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"isOpen"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collateral"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"entryVolume"}},{"kind":"Field","name":{"kind":"Name","value":"entryPrice"}},{"kind":"Field","name":{"kind":"Name","value":"entryTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"closePrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnL"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"borrowFeeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"fundingFeeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UserPositionsSubscription, UserPositionsSubscriptionVariables>;
export const GetPositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"getPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owner"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Position"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"owner"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owner"}}}]}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"isOpen"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":true}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collateral"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"entryVolume"}},{"kind":"Field","name":{"kind":"Name","value":"entryPrice"}},{"kind":"Field","name":{"kind":"Name","value":"entryTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetPositionsSubscription, GetPositionsSubscriptionVariables>;