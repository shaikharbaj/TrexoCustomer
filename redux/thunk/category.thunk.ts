import { privateClient } from "@/http/http-client";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Thunk to fetch category by slug
export const fetchCategoryBySlugThunk = createAsyncThunk(
    "category/fetchCategoryBySlug",
    async (slug:any) => {
      try {
        const res = await privateClient.get(`/category/fetchCategoryBySlug/${slug}`);
        return res.data;
      } catch (error: any) {
        if (error?.response?.data) {
          return error?.response?.data;
        }
        return error;
      }
    }
  );