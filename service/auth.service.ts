import { store } from "@/redux/store";
import { fetchUserByResetTokenThunk, forgotPasswordThunk, loginThunk, registerThunk, resetPasswordThunk, sendOtpThunk, verifyOtpThunk } from "@/redux/thunk/auth.thunk";
import { setAuth } from "@/redux/slice/auth.slice";
import { setCookie, removeCookie } from "@/utils/cookie";

//Function to login admin user
export const login = async (loginPayload: any) => {
  try {
    const { payload } = await store.dispatch(loginThunk(loginPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    const authObj = {
      isLoggedIn: true,
      token: payload?.data?.accessToken,
    };
    store.dispatch(setAuth(authObj));
    setCookie("token", authObj.token);
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message, data: payload?.data?.accessToken };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};

export const logout = () => {
  try {
    removeCookie("token");
    return { status: true, statusCode: 200, message: 'Logout Successfully.' };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
}

//Function to Register customer
export const registerCustomer = async (registerPayload: any) => {
  try {
    const { payload } = await store.dispatch(registerThunk(registerPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    const authObj = {
      isLoggedIn: true,
      token: payload?.data?.accessToken,
    };
    store.dispatch(setAuth(authObj));
    setCookie("token", authObj.token);
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};
//Function to Send Otp
export const sendOtp = async (sendOtpPayload: any) => {
  try {
    const { payload } = await store.dispatch(sendOtpThunk(sendOtpPayload))
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message, otp: payload?.data?.otp };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
}


//Function to verify Otp
export const verifyOtp = async (verifyOtpPayload: any) => {
  try {
    const { payload } = await store.dispatch(verifyOtpThunk(verifyOtpPayload))
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }

}

//Function to forgot password
export const forgotPassword = async (forgotPasswordPayload: any) => {
  try {
    const { payload } = await store.dispatch(forgotPasswordThunk(forgotPasswordPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
}


//Function to reset password
export const resetPassword = async (resetPasswordPayload: any) => {
  try {
    const { payload } = await store.dispatch(resetPasswordThunk(resetPasswordPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
}

//Function to fetch user by reset token
export const fetchUserByResetToken = async (token: any) => {
  try {
    const { payload } = await store.dispatch(fetchUserByResetTokenThunk(token));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message, data: payload?.data };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
}