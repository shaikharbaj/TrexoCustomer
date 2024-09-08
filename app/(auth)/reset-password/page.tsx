"use client";
import ResetPassword from "@/components/auth/reset-password";
import { AuthLayout } from "@/components/layout";

const ResetPasswordPage = () => {
    return (
        <AuthLayout>
            <ResetPassword />
        </AuthLayout>
    );
};

export default ResetPasswordPage;
