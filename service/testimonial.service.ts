import { store } from "@/redux/store";
import { fetchTestimonialsThunk } from "@/redux/thunk/testimonial.thunk";

export const fetchTestimonials = async () => {
    try {
        const { payload } = await store.dispatch(fetchTestimonialsThunk());
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
