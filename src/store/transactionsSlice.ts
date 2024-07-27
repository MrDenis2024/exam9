import {createSlice} from '@reduxjs/toolkit';
import {
  createTransaction,
  deleteTransaction,
  fetchOneTransaction,
  fetchTransactions,
  updateTransaction
} from './transactionsThunks';
import {ApiTransaction, Transaction} from '../types';

export interface transactionsState {
  createTransactionsLoading: boolean;
  fetchTransactionsLoading: boolean,
  deleteTransactionLoading: false | string,
  fetchOneTransaction: boolean,
  updateTransactionLoading: boolean,
  transaction: null | ApiTransaction,
  transactions: Transaction[],
}

const initialState: transactionsState = {
  createTransactionsLoading: false,
  fetchTransactionsLoading: false,
  deleteTransactionLoading: false,
  fetchOneTransaction: false,
  updateTransactionLoading: false,
  transactions: [],
  transaction: null,
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

    builder.addCase(deleteTransaction.pending, (state: transactionsState, {meta: {arg: transactionId}}) => {
      state.deleteTransactionLoading = transactionId;
    }).addCase(deleteTransaction.fulfilled, (state: transactionsState) => {
      state.deleteTransactionLoading = false;
    }).addCase(deleteTransaction.rejected, (state: transactionsState) => {
      state.deleteTransactionLoading = false;
    });

    builder.addCase(fetchOneTransaction.pending, (state: transactionsState) => {
      state.transaction = null;
      state.fetchOneTransaction = true;
    }).addCase(fetchOneTransaction.fulfilled, (state: transactionsState, {payload: transaction}) => {
      state.fetchOneTransaction = false;
      state.transaction = transaction;
    }).addCase(fetchOneTransaction.rejected, (state: transactionsState) => {
      state.fetchOneTransaction = false;
    });

    builder.addCase(updateTransaction.pending, (state: transactionsState) => {
      state.updateTransactionLoading = true;
    }).addCase(updateTransaction.fulfilled, (state: transactionsState) => {
      state.updateTransactionLoading = false;
    }).addCase(updateTransaction.rejected, (state: transactionsState) => {
      state.updateTransactionLoading = false;
    });
  },
  selectors: {
    selectorCreateTransactionsLoading: (state: transactionsState) => state.createTransactionsLoading,
    selectorFetchTransactionsLoading: (state: transactionsState) => state.fetchTransactionsLoading,
    selectorTransactions: (state: transactionsState) => state.transactions,
    selectorDeleteTransactionLoading: (state: transactionsState) => state.deleteTransactionLoading,
    selectorFetchOneTransaction: (state: transactionsState) => state.fetchOneTransaction,
    selectorTransaction: (state: transactionsState) => state.transaction,
    selectorUpdateTransactionLoading: (state: transactionsState) => state.updateTransactionLoading,
  },
});

export const transactionsReducer = transactionsSlice.reducer;
export const {
  selectorCreateTransactionsLoading,
  selectorFetchTransactionsLoading,
  selectorTransactions,
  selectorDeleteTransactionLoading,
  selectorFetchOneTransaction,
  selectorTransaction,
  selectorUpdateTransactionLoading,
} = transactionsSlice.selectors;