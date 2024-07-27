import {createSlice} from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {},
  reducers: {},
});

export const categoriesReducer = categoriesSlice.reducer;