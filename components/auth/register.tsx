import { useAppSelector, useMediaQuery } from '@/hooks';
import { registerSchema } from '@/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react';
import { Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import Link from 'next/link';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { InputGroup, InputGroupButton } from '../ui/input-group';
import { registerCustomer, sendOtp, verifyOtp } from '@/service/auth.service';
import { fetchProfile } from '@/service/profile.service';
import { maskPhoneNumber } from '@/utils/otp';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface IPasswordVisibility {
    password: boolean;
    confirmPassword: boolean;
}

const Register = () => {
    const navigation = useRouter();
    const [isPending, startTransition] = React.useTransition();
    const [passwordVisibility, setPasswordVisibility] = React.useState<IPasswordVisibility>({
        password: false,
        confirmPassword: false,
    });
    const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
    const [isMobileNoVerified, setMobileNoVerified] = useState<boolean>(false)
    const [otpSend, setOtpSend] = useState<boolean>(false)
    const [numberDisabled, setNumberDisabled] = useState<boolean>(false);
    const [phoneInput, setPhoneInput] = useState({ dialCode: '', phoneNumber: '' });

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "onSubmit",
        defaultValues: {
            first_name: "",
            last_name: "",
            aadhar_card_number: "",
            pan_card_number: "",
            email: "",
            dial_code: "",
            mobile_number: "",
            password: "",
            confirmPassword: "",
            otp: ""
        },
    });

    //Function to toggle paswword input
    const togglePasswordType = (field: 'password' | 'confirmPassword') => {
        setPasswordVisibility((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    //Function to handel form submit
    const onSubmit = (payload: any) => {
        // Extract country code and phone number
        const dialCode = `+${phoneInput.dialCode}`;
        const mobileNumber = phoneInput.phoneNumber.slice(phoneInput.dialCode.length);
        startTransition(async () => {
            try {
                payload.dial_code = dialCode;
                payload.mobile_number = mobileNumber
                const response: any = await registerCustomer(payload);
                if (response?.status === true && response?.statusCode === 200) {
                    fetchProfile();
                    toast.success(response?.message);
                    navigation.replace("dashboard");
                } else {
                    toast.error(response?.message);
                }
            } catch (error: any) {
                toast.error(error?.message);
            }
        });
    };

    //Function to handel send otp
    const handleSendOtp = async () => {
        startTransition(async () => {
            try {
                const mobileNumber = getValues("mobile_number");
                if (!mobileNumber) {
                    setError("mobile_number", {
                        type: "manual",
                        message: "Please enter a mobile number",
                    });
                    return;
                }
                const validMobileNumberRegex = /^.{12,20}$/;
                if (!validMobileNumberRegex.test(mobileNumber)) {
                    setError("mobile_number", {
                        type: "manual",
                        message: "Please enter a valid mobile number.",
                    });
                    return;
                }
                const response = await sendOtp({ mobile_number: mobileNumber });
                if (response?.status !== true && response?.statusCode !== 200) {
                    toast.error(response?.message);
                } else {
                    setValue('otp', response?.otp)
                    setOtpSend(true);
                    toast.success(response?.message);
                }
            } catch (error: any) {
                toast.error(error?.message);
            }
        })
    };

    //Function to handel verify otp
    const handleVerifyOtp = async () => {
        startTransition(async () => {
            try {
                const otp = getValues("otp");
                const mobileNumber = getValues("mobile_number")
                if (!otp) {
                    setError("otp", {
                        type: "manual",
                        message: "Please enter a OTP",
                    });
                    return;
                }
                //Creating Verify Otp payload
                const data = {
                    mobile_number: mobileNumber,
                    otp: otp
                }
                const response = await verifyOtp(data);
                if (response?.status === true && response?.statusCode === 200) {
                    setMobileNoVerified(true)
                    setNumberDisabled(true);
                    toast.success(response?.message);
                } else {
                    toast.error(response?.message);
                }
            } catch (error: any) {
                toast.error(error?.message);
            }
        })
    }

    //Function to handel mobile number
    const handleMobileNumber = (phone: any, country: any) => {
        setPhoneInput({
            dialCode: country.dialCode,
            phoneNumber: phone
        })
        const phoneNumber = `+${phone}`;
        setValue('mobile_number', phoneNumber);
    };

    return (
        <div className="w-full">
            <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900 mb-6">
                <span className="text-[#ff5757]">👋 Consumer</span> Create New Account
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 xl:mt-7">
                <div className="space-y-4">
                    <div className="flex justify-between gap-4">
                        <div>
                            <Label htmlFor="name" className="mb-2 font-medium text-default-600">
                                First Name <span className='text-destructive'>*</span>
                            </Label>
                            <Input
                                disabled={isPending}
                                {...register("first_name")}
                                type="text"
                                id="fname"
                                placeholder="Enter first name"
                                className={cn("", {
                                    "border-destructive": errors.first_name,
                                })}
                                size={!isDesktop2xl ? "xl" : "lg"}
                            />
                            {errors.first_name && (
                                <div className=" text-destructive mt-2 mb-4">
                                    {errors.first_name.message}
                                </div>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="name" className="mb-2 font-medium text-default-600">
                                Last Name <span className='text-destructive'>*</span>
                            </Label>
                            <Input
                                disabled={isPending}
                                {...register("last_name")}
                                type="text"
                                id="lname"
                                placeholder="Enter last name"
                                className={cn("", {
                                    "border-destructive": errors.last_name,
                                })}
                                size={!isDesktop2xl ? "xl" : "lg"}
                            />
                            {errors.last_name && (
                                <div className=" text-destructive mt-2 mb-4">
                                    {errors.last_name.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <Label
                            htmlFor="email"
                            className="mb-2 font-medium text-default-600"
                        >
                            Email <span className='text-destructive'>*</span>
                        </Label>
                        <Input
                            disabled={isPending}
                            {...register("email")}
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            className={cn("", {
                                "border-destructive": errors.email,
                            })}
                            size={!isDesktop2xl ? "xl" : "lg"}
                        />
                        {errors.email && (
                            <div className=" text-destructive mt-2 mb-4">
                                {errors.email.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <Label
                            htmlFor="text"
                            className="mb-2 font-medium text-default-600"
                        >
                            Aadhar Card No. <span className='text-destructive'>*</span>
                        </Label>
                        <Input
                            disabled={isPending}
                            {...register("aadhar_card_number")}
                            type="text"
                            id="aadhar_card_number"
                            placeholder="Enter aadhar card number"
                            className={cn("", {
                                "border-destructive": errors.aadhar_card_number,
                            })}
                            size={!isDesktop2xl ? "xl" : "lg"}
                        />
                        {errors.aadhar_card_number && (
                            <div className=" text-destructive mt-2 mb-4">
                                {errors.aadhar_card_number.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <Label
                            htmlFor="text"
                            className="mb-2 font-medium text-default-600"
                        >
                            Pan Card No. <span className='text-destructive'>*</span>
                        </Label>
                        <Input
                            disabled={isPending}
                            {...register("pan_card_number")}
                            type="text"
                            id="pan_card_number"
                            placeholder="Enter pan card number"
                            className={cn("", {
                                "border-destructive": errors.pan_card_number,
                            })}
                            size={!isDesktop2xl ? "xl" : "lg"}
                        />
                        {errors.pan_card_number && (
                            <div className=" text-destructive mt-2 mb-4">
                                {errors.pan_card_number.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <div>
                            <Label
                                htmlFor="mobile"
                                className="mb-2 font-medium text-default-600"
                            >
                                Mobile <span className='text-destructive'>*</span>
                            </Label>
                            {!otpSend ?
                                <div>
                                    <InputGroup>
                                        <div className="relative flex-grow">
                                            <PhoneInput
                                                country={'in'}
                                                value={phoneInput.phoneNumber}
                                                onChange={handleMobileNumber}
                                                inputProps={{
                                                    name: 'mobile_number',
                                                    required: true,
                                                    disabled: isPending,
                                                    className: cn(
                                                        "pl-12 pr-4 py-2 w-full text-base border-[1px] border-gray-300 rounded-[5px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent",
                                                        {
                                                            "border-destructive": errors?.mobile_number,
                                                        }
                                                    ),
                                                }}
                                                containerClass="w-full"
                                                inputClass="w-full"
                                                buttonClass="absolute transform"
                                                dropdownClass="absolute top-full left-0 z-10"
                                                enableSearch={true}
                                                searchClass="p-2"
                                            />
                                        </div>
                                        <InputGroupButton>
                                            <Button
                                                size="md"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleSendOtp();
                                                }}
                                                disabled={isPending}
                                            >
                                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                {isPending ? "Sending..." : "Send OTP"}
                                            </Button>
                                        </InputGroupButton>
                                    </InputGroup>
                                    {errors.mobile_number && (
                                        <div className=" text-destructive mt-2 mb-4">
                                            {errors.mobile_number.message}
                                        </div>
                                    )}
                                </div>
                                :
                                <div>
                                    <InputGroup>
                                        <Input
                                            disabled={isPending || numberDisabled}
                                            {...register("otp")}
                                            type="number"
                                            id="otp"
                                            placeholder="Enter OTP "
                                            className={cn("", {
                                                "border-destructive": errors.otp,
                                            })}
                                            size={!isDesktop2xl ? "xl" : "lg"}
                                        />
                                        {isMobileNoVerified ?
                                            <div
                                                className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
                                            >
                                                <Icon
                                                    icon="mdi:checkbox-marked-circle-outline"
                                                    className="w-5 h-5 text-green-500"
                                                />
                                            </div> :
                                            <InputGroupButton>

                                                <Button
                                                    size="md"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleVerifyOtp()
                                                    }}
                                                    disabled={isPending}
                                                >
                                                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                    {isPending ? "Verifying..." : " Verify OTP"}

                                                </Button>
                                            </InputGroupButton>
                                        }
                                    </InputGroup>
                                    {isMobileNoVerified ? null : <div className="mt-2 text-xs text-default-500">OTP sent on  {maskPhoneNumber(getValues('mobile_number'))} mobile number.</div>}
                                    {errors.otp && (
                                        <div className=" text-destructive mt-2 mb-4">
                                            {errors.otp.message}
                                        </div>
                                    )}
                                </div>
                            }

                        </div>
                    </div>
                    <div className="flex justify-between gap-4">
                        <div >
                            <Label
                                htmlFor="password"
                                className="mb-2 font-medium text-default-600"
                            >
                                Create Password <span className='text-destructive'>*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    type={passwordVisibility.password ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter password"
                                    size={!isDesktop2xl ? "xl" : "lg"}
                                    disabled={isPending}
                                    {...register("password")}
                                    className={cn("", {
                                        "border-destructive": errors.password,
                                    })}
                                />
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
                                    onClick={() => togglePasswordType("password")}
                                >
                                    {passwordVisibility.password ? (
                                        <Icon
                                            icon="heroicons:eye"
                                            className="w-5 h-5 text-default-400"
                                        />
                                    ) : (
                                        <Icon
                                            icon="heroicons:eye-slash"
                                            className="w-5 h-5 text-default-400"
                                        />
                                    )}
                                </div>
                            </div>
                            {errors.password && (
                                <div className=" text-destructive mt-2">
                                    {errors.password.message as string}
                                </div>
                            )}
                        </div>
                        <div >
                            <Label
                                htmlFor="password"
                                className="mb-2 font-medium text-default-600"
                            >
                                Re-enter Password <span className='text-destructive'>*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    type={passwordVisibility.confirmPassword ? "text" : "password"} id="confirmPassword"
                                    placeholder="Enter password"
                                    size={!isDesktop2xl ? "xl" : "lg"}
                                    disabled={isPending}
                                    {...register("confirmPassword")}
                                    className={cn("", {
                                        "border-destructive": errors.confirmPassword,
                                    })}
                                />
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
                                    onClick={() => togglePasswordType("confirmPassword")}
                                >
                                    {passwordVisibility.confirmPassword ? (
                                        <Icon
                                            icon="heroicons:eye"
                                            className="w-5 h-5 text-default-400"
                                        />
                                    ) : (
                                        <Icon
                                            icon="heroicons:eye-slash"
                                            className="w-5 h-5 text-default-400"
                                        />
                                    )}
                                </div>
                            </div>
                            {errors.confirmPassword && (
                                <div className=" text-destructive mt-2">
                                    {errors.confirmPassword.message as string}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                <Button
                    className="w-full mt-5"
                    disabled={isPending || !isMobileNoVerified}
                    size={!isDesktop2xl ? "lg" : "md"}
                >
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isPending ? "Registering..." : "Submit"}
                </Button>
            </form>
            <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
                Already have an account? {" "}
                <Link href="/login" className="text-[#ff5757] font-bold">
                    Login
                </Link>
            </div>
        </div>
    )
}

export default Register;