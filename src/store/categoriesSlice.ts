import {createSlice} from '@reduxjs/toolkit';
import {createCategories, fetchCategories} from './categoriesThunks';
import {Category} from '../types';

export interface categoriesState {
  createLoading: boolean;
  fetchCategoriesLoading: boolean;
  categories: Category[];
}

const initialState: categoriesState = {
  createLoading: false,
  fetchCategoriesLoading: false,
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCategories.pending, (state: categoriesState) => {
      state.createLoading = true;
    }).addCase(createCategories.fulfilled, (state: categoriesState) => {
      state.createLoading = false;
    }).addCase(createCategories.rejected, (state: categoriesState) => {
      state.createLoading = false;
    });

    builder.addCase(fetchCategories.pending, (state: categoriesState) => {
      state.fetchCategoriesLoading = true;
    }).addCase(fetchCategories.fulfilled, (state: categoriesState, {payload: categories}) => {
      state.fetchCategoriesLoading = false;
      state.categories = categories;
    }).addCase(fetchCategories.rejected, (state: categoriesState) => {
      state.fetchCategoriesLoading = false;
    });
  },
  selectors: {
    selectorCreateLoading: (state: categoriesState) => state.createLoading,
    selectorFetchCategoriesLoading: (state: categoriesState) => state.fetchCategoriesLoading,
    selectorCategories: (state: categoriesState) => state.categories,
  }
});

export const categoriesReducer = categoriesSlice.reducer;
export const {
  selectorCreateLoading,
  selectorFetchCategoriesLoading,
  selectorCategories,
} = categoriesSlice.selectors;