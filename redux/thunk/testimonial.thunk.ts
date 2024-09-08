import { createAsyncThunk } from '@reduxjs/toolkit';
import { publicClient } from '@/http/http-client';

export const fetchTestimonialsThunk = createAsyncThunk(
    'testimonial/fetchTestimonials',
    async () => {
        try {
            const res = await publicClient.get('/testimonial');
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);
