import { createSlice } from "@reduxjs/toolkit";
import { fetchWishlistThunk,removeFromWishlistThunk } from "../thunk/wishlist.thunk";

const initialState = {
  isLoading: false,
  error: {},
  refresh: false,
};

export const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchWishlistThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchWishlistThunk.fulfilled, (state: any) => {
        state.isLoading = false;
      })
      .addCase(fetchWishlistThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
      builder
      .addCase(removeFromWishlistThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(removeFromWishlistThunk.fulfilled, (state: any) => {
        state.isLoading = false;
      })
      .addCase(removeFromWishlistThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export default wishlist.reducer;
