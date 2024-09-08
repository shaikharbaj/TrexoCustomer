import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";


//thunk to fetch wishlist product....
export const fetchWishlistThunk = createAsyncThunk(
  "wishlist/fetch-wishlist",
  async () => {
    try {
      const res = await privateClient.get("/wishlist");
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//thunk to remove product from wishlist..
export const removeFromWishlistThunk = createAsyncThunk(
    "wishlist/remove-wishlist",
    async (uuid:string) => {
      try {
        const res = await privateClient.delete(`/wishlist/${uuid}`);
        return res.data;
      } catch (error: any) {
        if (error?.response?.data) {
          return error?.response?.data;
        }
        return error;
      }
    }
  );
