import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProductAttributesByIdThunk,
  fetchProductByBrandSlugThunk,
  fetchProductBySlugThunk,
  fetchProductBySubCategorySlugThunk,
} from "../thunk/product.thunk";

const initialState = {
  isLoading: false,
  error: {},
  refresh: false
};

export const product = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchProductBySubCategorySlugThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchProductBySubCategorySlugThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(fetchProductBySubCategorySlugThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchProductByBrandSlugThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchProductByBrandSlugThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(fetchProductByBrandSlugThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchProductBySlugThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchProductBySlugThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(fetchProductBySlugThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchProductAttributesByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchProductAttributesByIdThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(fetchProductAttributesByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

// export const { resetList } = category.actions;

export default product.reducer;
