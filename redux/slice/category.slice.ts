import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategoryBySlugThunk
} from "../thunk/category.thunk";

const initialState = {
  isLoading: false,
  error: {},
  refresh: false
};

export const category = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchCategoryBySlugThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoryBySlugThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(fetchCategoryBySlugThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

// export const { resetList } = category.actions;

export default category.reducer;
