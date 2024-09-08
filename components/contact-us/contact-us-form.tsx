import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { submitContactUs } from '@/service/contact-us.service';
import contactUsSchema from '@/validations/contact-us/contact-us.schema'; 

const ContactUsForm: React.FC = () => {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [captcha, setCaptcha] = useState<string>('');
  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean>(true);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(contactUsSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      name: '',
      message: '',
      captchaInput: '',
    },
  });

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const captchaInput = watch('captchaInput');

  const validateCaptcha = () => {
    if (captchaInput !== captcha) {
      setIsCaptchaValid(false);
      return false;
    }
    setIsCaptchaValid(true);
    return true;
  };

  const onSubmit = (data:any) => {
    startTransition(async () => {
      try {
        const response = await submitContactUs(data);
        toast.success(response.message || 'Message sent successfully!');
        reset();
        generateCaptcha();
      } catch (error: any) {
        toast.error(error.message || 'Failed to send message.');
      }
    });
  };

  return (
    <div className="w-full flex justify-center items-start py-10">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
        <div className="text-2xl font-bold text-default-900 mb-6 text-center">
          Contact Us
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2 font-medium text-default-600">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              {...register('name')}
              type="text"
              id="name"
              placeholder="Your Name"
              className={cn('', {
                'border-destructive': errors.name,
              })}
            />
            {errors.name && (
              <div className="text-destructive mt-2 mb-4">
                {errors.name.message}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="mb-2 font-medium text-default-600">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              {...register('email')}
              type="email"
              id="email"
              placeholder="Your Email"
              className={cn('', {
                'border-destructive': errors.email,
              })}
            />
            {errors.email && (
              <div className="text-destructive mt-2 mb-4">
                {errors.email.message}
              </div>
            )}
          </div>
          <div>
            <Label
              htmlFor="message"
              className="mb-2 font-medium text-default-600"
            >
              Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              disabled={isPending}
              {...register('message')}
              id="message"
              placeholder="Your Message"
              className={cn('resize-none h-32', {
                'border-destructive': errors.message,
              })}
            />
            {errors.message && (
              <div className="text-destructive mt-2 mb-4">
                {errors.message.message}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center bg-gray-200 p-2 rounded-md font-mono text-lg tracking-wide select-none">
              {captcha}
            </div>
            <Button
              type="button"
              size="sm"
              className="bg-blue-500 text-white"
              onClick={generateCaptcha}
              disabled={isPending}
            >
              Refresh
            </Button>
          </div>
          <div>
            <Label
              htmlFor="captchaInput"
              className="mb-2 font-medium text-default-600"
            >
              Enter the text shown above <span className="text-destructive">*</span>
            </Label>
            <Input
              disabled={isPending}
              {...register('captchaInput')}
              type="text"
              id="captchaInput"
              placeholder="Enter CAPTCHA"
              className={cn('', {
                'border-destructive': errors.captchaInput || !isCaptchaValid,
              })}
            />
            {errors.captchaInput && (
              <div className="text-destructive mt-2 mb-4">
                {errors.captchaInput.message}
              </div>
            )}
            {!isCaptchaValid && (
              <div className="text-destructive mt-2 mb-4">
                CAPTCHA does not match. Please try again.
              </div>
            )}
          </div>
          <Button
            type="submit"
            size="default"
            className="w-full mt-5"
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
