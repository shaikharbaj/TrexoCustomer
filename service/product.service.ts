import { store } from "@/redux/store";
import {
    fetchProductAttributesByIdThunk,
    fetchProductByBrandSlugThunk,
    fetchProductBySlugThunk,
    fetchProductBySubCategorySlugThunk,
} from "@/redux/thunk/product.thunk";

//Function to fetch sub-category by slug
export const fetchProductBySubCategorySlug = async (slug: any) => {
    try {
        const { payload } = await store.dispatch(fetchProductBySubCategorySlugThunk(slug));
        if (payload?.status !== true) {
            return {
                status: payload?.status,
                statusCode: payload?.statusCode,
                message: payload?.message,
            };
        }
        return {
            status: payload?.status,
            statusCode: payload?.statusCode,
            message: payload?.message,
            data: payload?.data,
        };
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Something went wrong.");
    }
};

//Function to fetch products by brand slug
export const fetchProductByBrandSlug = async (slug: any) => {
    try {
        const { payload } = await store.dispatch(fetchProductByBrandSlugThunk(slug));
        if (payload?.status !== true) {
            return {
                status: payload?.status,
                statusCode: payload?.statusCode,
                message: payload?.message,
            };
        }
        return {
            status: payload?.status,
            statusCode: payload?.statusCode,
            message: payload?.message,
            data: payload?.data,
        };
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Something went wrong.");
    }
};

//Function to fetch products by slug
export const fetchProductBySlug = async (slug: any) => {
    try {
        const { payload } = await store.dispatch(fetchProductBySlugThunk(slug));
        if (payload?.status !== true) {
            return {
                status: payload?.status,
                statusCode: payload?.statusCode,
                message: payload?.message,
            };
        }
        return {
            status: payload?.status,
            statusCode: payload?.statusCode,
            message: payload?.message,
            data: payload?.data,
        };
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Something went wrong.");
    }
};

//Function to fetch variants by product id
export const fetchProductAttributesById = async (productId: string) => {
    try {
        const { payload } = await store.dispatch(fetchProductAttributesByIdThunk(productId));
        if (payload?.status !== true) {
            return {
                status: payload?.status,
                statusCode: payload?.statusCode,
                message: payload?.message,
            };
        }
        return {
            status: payload?.status,
            statusCode: payload?.statusCode,
            message: payload?.message,
            data: payload?.data,
        };
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Something went wrong.");
    }
};