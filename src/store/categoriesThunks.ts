import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDishes, Category, CategoryMutation} from '../types';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';

export const createCategories = createAsyncThunk<void, CategoryMutation, {state: RootState}>('categories/create', async (category) => {
  await axiosApi.post('/categories.json', category);
});

export const fetchCategories = createAsyncThunk<Category[], void, {state: RootState}>('categories/fetchCategories', async () => {
  const {data: categoriesResponse} = await axiosApi.get<ApiDishes | null>('/categories.json');

  if(categoriesResponse === null) {
    return [];
  }

  return Object.keys(categoriesResponse).map((id) => {
    return {
      ...categoriesResponse[id],
      id,
    };
  });
});