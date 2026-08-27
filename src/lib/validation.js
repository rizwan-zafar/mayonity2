import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  budget: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(12, "Tell us a little more about the project").max(4000),
  website_url: z.string().max(0).optional().or(z.literal("")),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(120),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(120),
});
