import { createSlice } from "@reduxjs/toolkit";
import { fetchUserAddressThunk } from "../thunk/user-address.thunk";

const initialState = {
    isLoading: false,
    error: {},
    refresh: false
};

export const userAddress = createSlice({
    name: "user-address",
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder
            .addCase(fetchUserAddressThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(fetchUserAddressThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
            })
            .addCase(fetchUserAddressThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
    },
});

export default userAddress.reducer;
