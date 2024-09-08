import { privateClient } from "@/http/http-client";
import { createAsyncThunk } from "@reduxjs/toolkit";

  //Thunk to fetch product by sub-category slug
  export const fetchProductBySubCategorySlugThunk = createAsyncThunk(
    "product/fetchProductBySubCategorySlug",
    async (slug:any) => {
      try {
        const res = await privateClient.get(`/product/fetchProductBySubCategorySlug/${slug}`);
        return res.data;
      } catch (error: any) {
        if (error?.response?.data) {
          return error?.response?.data;
        }
        return error;
      }
    }
  );

  //Thunk to fetch product by brand slug
  export const fetchProductByBrandSlugThunk = createAsyncThunk(
    "product/fetchProductByBrandSlug",
    async (slug:any) => {
      try {
        const res = await privateClient.get(`/product/fetchProductByBrandSlug/${slug}`);
        return res.data;
      } catch (error: any) {
        if (error?.response?.data) {
          return error?.response?.data;
        }
        return error;
      }
    }
  );

  //Thunk to fetch product by slug
  export const fetchProductBySlugThunk = createAsyncThunk(
    "product/fetchProductBySlug",
    async (slug:any) => {
      try {
        const res = await privateClient.get(`/product/fetchProductBySlug/${slug}`);
        return res.data;
      } catch (error: any) {
        if (error?.response?.data) {
          return error?.response?.data;
        }
        return error;
      }
    }
  );

  //Thunk to fetch variants by product id
  export const fetchProductAttributesByIdThunk = createAsyncThunk(
    "product/fetchProductAttributesById",
    async (uuid:string) => {
      try {
        const res = await privateClient.get(`/product/fetchProductAttributesById/${uuid}`);
        return res.data;
      } catch (error: any) {
        if (error?.response?.data) {
          return error?.response?.data;
        }
        return error;
      }
    }
  );