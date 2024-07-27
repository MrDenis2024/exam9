import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCategories, CategoryMutation, ICategory} from '../types';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';

export const createCategories = createAsyncThunk<void, CategoryMutation, {state: RootState}>('categories/create', async (category) => {
  await axiosApi.post('/categories.json', category);
});

export const fetchCategories = createAsyncThunk<ICategory[], void, {state: RootState}>('categories/fetchCategories', async () => {
  const {data: categoriesResponse} = await axiosApi.get<ApiCategories | null>('/categories.json');

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

export const deleteCategory = createAsyncThunk<void, string, {state: RootState}>('categories/delete', async (id) => {
  await axiosApi.delete(`/categories/${id}.json`);
});

export const fetchOneCategory = createAsyncThunk<CategoryMutation, string, {state: RootState}>('categories/fetchOne', async (id) => {
  const {data: categoryResponse} = await axiosApi.get<CategoryMutation | null>(`/categories/${id}.json`);

  if(categoryResponse === null) {
    throw new Error('Not found');
  }

  return categoryResponse;
});

export interface UpdateCategoryArg {
  id: string;
  category: CategoryMutation;
}

export const updateCategory = createAsyncThunk<void, UpdateCategoryArg, {state: RootState}>('categories/update', async ({id, category}) => {
  await axiosApi.put(`/categories/${id}.json`, category);
});