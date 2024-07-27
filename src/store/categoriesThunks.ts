import {createAsyncThunk} from '@reduxjs/toolkit';
import {Category} from '../types';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';

export const createCategories = createAsyncThunk<void, Category, {state: RootState}>('categories/create', async (category) => {
  await axiosApi.post('/categories.json', category);
});