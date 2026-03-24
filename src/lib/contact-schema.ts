import { z } from "zod";

export const adTypes = [
  "College Advertising",
  "Digital Ads",
  "Local Promotions",
  "Brand Campaigns (Hybrid)",
] as const;

export const budgetRanges = [
  "Under ₹10k",
  "₹10k–₹25k",
  "₹25k–₹50k",
  "₹50k–₹1L",
  "₹1L+",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  company: z.string().min(2, "Please enter your company name."),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number.")
    .max(20, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email."),
  adType: z.enum(adTypes, { message: "Please select an ad type." }),
  budgetRange: z.enum(budgetRanges, { message: "Please select a budget range." }),
  message: z.string().min(10, "Please share a few details (at least 10 characters)."),
});

export type ContactPayload = z.infer<typeof contactSchema>;

