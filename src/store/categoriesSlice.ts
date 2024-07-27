import {createSlice} from '@reduxjs/toolkit';
import {createCategories} from './categoriesThunks';

export interface categoriesState {
  createLoading: boolean;
}

const initialState: categoriesState = {
  createLoading: false,
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
  },
  selectors: {
    selectorCreateLoading: (state: categoriesState) => state.createLoading,
  }
});

export const categoriesReducer = categoriesSlice.reducer;
export const {
  selectorCreateLoading,
} = categoriesSlice.selectors;