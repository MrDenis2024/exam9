import {createSlice} from '@reduxjs/toolkit';
import {createCategories, deleteCategory, fetchCategories, fetchOneCategory, updateCategory} from './categoriesThunks';
import {CategoryMutation, ICategory} from '../types';

export interface categoriesState {
  createLoading: boolean;
  fetchCategoriesLoading: boolean;
  deleteCategoryLoading: false | string;
  fetchOneCategory: boolean;
  updateCategory: boolean;
  category: null | CategoryMutation;
  categories: ICategory[];
}

const initialState: categoriesState = {
  createLoading: false,
  fetchCategoriesLoading: false,
  deleteCategoryLoading: false,
  fetchOneCategory: false,
  updateCategory: false,
  category: null,
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

    builder.addCase(deleteCategory.pending, (state: categoriesState, {meta: {arg: categoryID}}) => {
      state.deleteCategoryLoading = categoryID;
    }).addCase(deleteCategory.fulfilled, (state: categoriesState) => {
      state.deleteCategoryLoading = false;
    }).addCase(deleteCategory.rejected, (state: categoriesState) => {
      state.deleteCategoryLoading = false;
    });

    builder.addCase(fetchOneCategory.pending, (state: categoriesState) => {
      state.category = null;
      state.fetchOneCategory = true;
    }).addCase(fetchOneCategory.fulfilled, (state: categoriesState, {payload: category}) => {
      state.category = category;
      state.fetchOneCategory = false;
    }).addCase(fetchOneCategory.rejected, (state: categoriesState) => {
      state.fetchOneCategory = false;
    });

    builder.addCase(updateCategory.pending, (state: categoriesState) => {
      state.updateCategory = true;
    }).addCase(updateCategory.fulfilled, (state: categoriesState) => {
      state.updateCategory = false;
    }).addCase(updateCategory.rejected, (state: categoriesState) => {
      state.updateCategory = false;
    });
  },
  selectors: {
    selectorCreateLoading: (state: categoriesState) => state.createLoading,
    selectorFetchCategoriesLoading: (state: categoriesState) => state.fetchCategoriesLoading,
    selectorCategories: (state: categoriesState) => state.categories,
    selectorDeleteCategoryLoading: (state: categoriesState) => state.deleteCategoryLoading,
    selectorFetchOneCategory: (state: categoriesState) =>  state.fetchOneCategory,
    selectorCategory: (state: categoriesState) => state.category,
    selectorUpdateCategory: (state: categoriesState) => state.updateCategory,
  }
});

export const categoriesReducer = categoriesSlice.reducer;
export const {
  selectorCreateLoading,
  selectorFetchCategoriesLoading,
  selectorCategories,
  selectorDeleteCategoryLoading,
  selectorFetchOneCategory,
  selectorCategory,
  selectorUpdateCategory
} = categoriesSlice.selectors;