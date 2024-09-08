import { privateClient, publicClient } from "@/http/http-client";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Thunk to fetch cart products
export const fetchProductFromCartThunk = createAsyncThunk("cart/fetchProductFromCart", async () => {
  try {
    const res = await privateClient.get(`/cart`);
    return res.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return error?.response?.data;
    }
    return error;
  }
});

// Thunk to add product to cart
interface IAddToCartPayload {
  product_id: number;
}
export const addProductToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async (payload: IAddToCartPayload) => {
    try {
      const res = await privateClient.post("/cart", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      throw error;
    }
  }
);

interface IUpdateProductCartPayload {
  cart_id: number;
  variant_id: number;
  quantity: number;
}

//Thunk to update product in cart.
export const updateProductCartThunk = createAsyncThunk(
  "cart/updateCart",
  async (payload: IUpdateProductCartPayload) => {
    try {
      const res = await privateClient.patch(`/cart/${payload.cart_id}`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        throw new Error(error.response.data.message || "Failed to send message.");
      }
      throw error;
    }
  }
);

//Thunk to remove product from cart.
export const removeProductFromCartThunk = createAsyncThunk(
  "cart/removeProductFromCart",
  async (uuid: string) => {
    try {
      const res = await privateClient.delete(`/cart/${uuid}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);