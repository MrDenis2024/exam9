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

  return Object.keys(transactionsResponse).reverse().map((id) => {
    return {
      ...transactionsResponse[id],
      id,
    };
  });
});

export const deleteTransaction = createAsyncThunk<void, string, {state: RootState}>('transactions/delete', async (id) => {
  await axiosApi.delete(`/transaction/${id}.json`);
});

export const fetchOneTransaction = createAsyncThunk<ApiTransaction, string, {state: RootState}>('transactions/fetchOne', async (id) => {
  const {data: transactionResponse} = await axiosApi.get<ApiTransaction | null>(`/transaction/${id}.json`);

  if(transactionResponse === null) {
    throw new Error('Not found');
  }

  return transactionResponse;
});

export interface UpdateTransactionArg {
  id: string;
  transaction: ApiTransaction;
}

export const updateTransaction = createAsyncThunk<void, UpdateTransactionArg, {state: RootState}>('categories/update', async ({id, transaction}) => {
  await axiosApi.put(`/transaction/${id}.json`, transaction);
});