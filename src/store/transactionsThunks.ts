import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiTransaction, ApiTransactions, Transaction} from '../types';
import axiosApi from '../axiosApi';
import {RootState} from '../app/store';

export const createTransaction = createAsyncThunk<void, ApiTransaction, {state: RootState}>('transactions/create', async (transaction) => {
    await axiosApi.post('/transaction.json', transaction);
});

export const fetchTransactions = createAsyncThunk<Transaction[], void, {state: RootState}>('transactions/fetch', async () => {
  const {data: transactionsResponse} = await axiosApi.get<ApiTransactions | null>('/transaction.json');

  if(transactionsResponse === null) {
    return [];
  }

  return Object.keys(transactionsResponse).map((id) => {
    return {
      ...transactionsResponse[id],
      id,
    };
  });
});