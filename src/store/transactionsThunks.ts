import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiTransaction} from '../types';
import axiosApi from '../axiosApi';
import {RootState} from '../app/store';

export const createTransaction = createAsyncThunk<void, ApiTransaction, {state: RootState}>('transactions/create', async (transaction) => {
    await axiosApi.post('/transaction.json', transaction);
});