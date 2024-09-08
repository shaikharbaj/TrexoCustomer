import { store } from "@/redux/store";
import { fetchUserAddressThunk } from "@/redux/thunk/user-address.thunk";

export const fetchUserAddress = async () => {
    try {
        const { payload } = await store.dispatch(fetchUserAddressThunk());
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
