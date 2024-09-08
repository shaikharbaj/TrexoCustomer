import { createSlice } from '@reduxjs/toolkit';
import { fetchTestimonialsThunk } from '../thunk/testimonial.thunk';

const initialState = {
    testimonials: {},
    loading: false,
    error: {},
};

const testimonialSlice = createSlice({
    name: 'testimonials',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestimonialsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTestimonialsThunk.fulfilled, (state, action: any) => {
                state.loading = false;
                state.testimonials = action.payload;
            })
            .addCase(fetchTestimonialsThunk.rejected, (state, action:any) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default testimonialSlice.reducer;
