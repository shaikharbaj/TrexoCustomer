import { store } from "@/redux/store";
import { submitContactUsThunk } from "@/redux/thunk/contact-us.thunk";

// Function to handle form submission
export const submitContactUs = async (formData: { name: string; email: string; message: string }) => {
  try {
    const { payload } = await store.dispatch(submitContactUsThunk(formData));
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
    };
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong.");
  }
};
