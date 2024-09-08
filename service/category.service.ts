import { store } from "@/redux/store";
import { fetchCategoryBySlugThunk } from "@/redux/thunk/category.thunk";


//Function to fetch category by slug
export const fetchCategoryBySlug = async (slug: any) => {
    try {
        const { payload } = await store.dispatch(fetchCategoryBySlugThunk(slug));        
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

