import {createSlice} from '@reduxjs/toolkit';
import {createTransaction} from './transactionsThunks';

export interface transactionsState {
  createTransactionsLoading: boolean;
}

const initialState: transactionsState = {
  createTransactionsLoading: false,
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
  },
  selectors: {
    selectorCreateTransactionsLoading: (state: transactionsState) => state.createTransactionsLoading,
  },
});

export const transactionsReducer = transactionsSlice.reducer;
export const {
  selectorCreateTransactionsLoading,
} = transactionsSlice.selectors;