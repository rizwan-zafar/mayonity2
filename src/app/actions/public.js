"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { contactSchema, newsletterSchema } from "@/lib/validation";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function submitContact(prev, formData) {
  const payload = {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    company: String(formData.get("company") || ""),
    service: String(formData.get("service") || ""),
    budget: String(formData.get("budget") || ""),
    message: String(formData.get("message") || ""),
    website_url: String(formData.get("website_url") || ""),
  };

  if (payload.website_url) {
    return { ok: true };
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0]] = issue.message;
    }
    return { ok: false, error: "Please check the form.", fieldErrors };
  }

  const headerList = await headers();
  const ip = getClientIp(headerList);
  const limited = rateLimit(`contact:${ip}`, 6, 60 * 60 * 1000);
  if (!limited.ok) {
    return { ok: false, error: "Too many messages. Please try again later." };
  }

  await prisma.contactMessage.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      company: parsed.data.company || null,
      service: parsed.data.service || null,
      budget: parsed.data.budget || null,
      message: parsed.data.message,
    },
  });

  return { ok: true };
}

export async function subscribeNewsletter(prev, formData) {
  const parsed = newsletterSchema.safeParse({
    email: String(formData.get("email") || ""),
  });
  if (!parsed.success) {
    return { ok: false, error: "Enter a valid email." };
  }

  const headerList = await headers();
  const ip = getClientIp(headerList);
  const limited = rateLimit(`news:${ip}`, 8, 60 * 60 * 1000);
  if (!limited.ok) {
    return { ok: false, error: "Please try again later." };
  }

  try {
    await prisma.newsletterSubscriber.create({ data: { email: parsed.data.email } });
  } catch {
    return { ok: true, message: "You are already on the list." };
  }

  return { ok: true, message: "Welcome to the Mayonity list." };
}
