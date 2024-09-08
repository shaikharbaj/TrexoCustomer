import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import datatableSlice from "./datatable.slice";
import profileSlice from "./profile.slice";
import modalSlice from "./modal.slice";
import testimonialSlice from "./testimonial.slice";
import categorySlice from "./category.slice";
import productSlice from "./product.slice";
import wishlistSlice from './wishlist.slice'
import cartSlice from "./cart.slice";
import userAddressSlice from "./user-address.slice";

const rootReducer = combineReducers({
    auth: authSlice,
    datatable: datatableSlice,
    modal: modalSlice,
    profile: profileSlice,
    testimonials: testimonialSlice,
    category: categorySlice,
    product: productSlice,
    wishlist:wishlistSlice,
    cart:cartSlice,
    userAddress:userAddressSlice
});

export default rootReducer;
