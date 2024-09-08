import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicClient } from "@/http/http-client"; 

// Create a thunk to handle form submission
export const submitContactUsThunk = createAsyncThunk(
  "contactUs/submit-form",
  async (formData: { name: string; email: string; message: string }) => {
    try {
      const res = await publicClient.post("/contact-us", formData);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        throw new Error(error.response.data.message || "Failed to send message.");
      }
      throw error;
    }
  }
);
