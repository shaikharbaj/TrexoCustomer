import { store } from "@/redux/store";
import {
  fetchWishlistThunk,
  removeFromWishlistThunk,
} from "@/redux/thunk/wishlist.thunk";

//Function to fetch wishlist products.....
export const FetchWishlist = async () => {
  try {
    const { payload } = await store.dispatch(fetchWishlistThunk());
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

//Function to delete from wishlist.....
export const RemoveFromWishlist = async (uuid: string) => {
  try {
    const { payload } = await store.dispatch(removeFromWishlistThunk(uuid));
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
