import { createSlice } from "@reduxjs/toolkit";
import { submitContactUsThunk } from "@/redux/thunk/contact-us.thunk";

const initialState = {
  isSubmitting: false,
};

export const contactUsSlice = createSlice({
  name: "contactUs",
  initialState,
  reducers: {
    resetContactUsState: (state) => {
      state.isSubmitting = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactUsThunk.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(submitContactUsThunk.fulfilled, (state, action) => {
        state.isSubmitting = false;
      })
      .addCase(submitContactUsThunk.rejected, (state, action) => {
        state.isSubmitting = false;
      });
  },
});

export const { resetContactUsState } = contactUsSlice.actions;

export default contactUsSlice.reducer;
