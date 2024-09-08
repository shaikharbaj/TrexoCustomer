import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateClient } from '@/http/http-client';

export const fetchUserAddressThunk = createAsyncThunk(
    'user-address/fetchUserAddress',
    async () => {
        try {
            const res = await privateClient.get('/user-address/buyer');
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);
