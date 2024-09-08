import { z } from "zod";

const contactUsSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email("Please enter a valid email"),
  message: z.string().min(1, { message: "Message is required" }),
  captchaInput: z.string().min(1, { message: "CAPTCHA is required" }),
});

export type ContactUsInput = z.infer<typeof contactUsSchema>;

export default contactUsSchema;
