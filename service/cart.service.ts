import { store } from "@/redux/store";
import { addProductToCartThunk, fetchProductFromCartThunk, removeProductFromCartThunk, updateProductCartThunk } from "@/redux/thunk/cart.thunk";


// Function to add product to cart
export const addProductToCart = async (cartPayload: any) => {
  try {
    const { payload } = await store.dispatch(addProductToCartThunk(cartPayload));
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
    };
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong.");
  }
};

// Function to fetch product from cart
export const fetchProductFormCart = async () => {
  try {
    const { payload } = await store.dispatch(fetchProductFromCartThunk());
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
    throw new Error(error.message || "Something went wrong.");
  }
};


//Function to update product from cart
export const updateProductFromCart = async (cartPayload: any) => {
  try {
    const { payload } = await store.dispatch(updateProductCartThunk(cartPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};

//Function to delete product from cart
export const removeProductFromCart = async (uuid: string) => {
  try {
    const { payload } = await store.dispatch(removeProductFromCartThunk(uuid));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};