import { createSlice } from "@reduxjs/toolkit";
import { addProductToCartThunk, fetchProductFromCartThunk, removeProductFromCartThunk, updateProductCartThunk } from "../thunk/cart.thunk";

const initialState = {
  isLoading: false,
  error: {},
  refresh: false
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchProductFromCartThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchProductFromCartThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(fetchProductFromCartThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
      builder
      .addCase(addProductToCartThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(addProductToCartThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(addProductToCartThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
      builder
      .addCase(updateProductCartThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateProductCartThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(updateProductCartThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
      builder
      .addCase(removeProductFromCartThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(removeProductFromCartThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(removeProductFromCartThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export default cart.reducer;
