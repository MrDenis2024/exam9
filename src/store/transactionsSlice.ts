import {createSlice} from '@reduxjs/toolkit';
import {createTransaction, fetchTransactions} from './transactionsThunks';
import {Transaction} from '../types';

export interface transactionsState {
  createTransactionsLoading: boolean;
  fetchTransactionsLoading: boolean,
  transactions: Transaction[],
}

const initialState: transactionsState = {
  createTransactionsLoading: false,
  fetchTransactionsLoading: false,
  transactions: [],
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTransaction.pending, (state: transactionsState) => {
      state.createTransactionsLoading = true;
    }).addCase(createTransaction.fulfilled, (state: transactionsState) => {
      state.createTransactionsLoading = false;
    }).addCase(createTransaction.rejected, (state: transactionsState) => {
      state.createTransactionsLoading = false;
    });

    builder.addCase(fetchTransactions.pending, (state: transactionsState) => {
      state.fetchTransactionsLoading = true;
    }).addCase(fetchTransactions.fulfilled, (state: transactionsState, {payload: transactions}) => {
      state.fetchTransactionsLoading = false;
      state.transactions = transactions;
    }).addCase(fetchTransactions.rejected, (state: transactionsState) => {
      state.fetchTransactionsLoading = false;
    });
  },
  selectors: {
    selectorCreateTransactionsLoading: (state: transactionsState) => state.createTransactionsLoading,
    selectorFetchTransactionsLoading: (state: transactionsState) => state.fetchTransactionsLoading,
    selectorTransactions: (state: transactionsState) => state.transactions,
  },
});

export const transactionsReducer = transactionsSlice.reducer;
export const {
  selectorCreateTransactionsLoading,
  selectorFetchTransactionsLoading,
  selectorTransactions
} = transactionsSlice.selectors;