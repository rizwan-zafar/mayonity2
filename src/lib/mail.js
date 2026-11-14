import nodemailer from "nodemailer";
import { DEFAULT_NOTIFY_EMAIL } from "@/lib/notify-email";

let transporter;

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
  if (!host || !user || !pass) return null;

  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 587);
    const rejectUnauthorized = process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false";
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === "true" || port === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized },
    });
  }
  return transporter;
}

/** Sender shown on contact emails — must match the authenticated SMTP mailbox on cPanel. */
export function resolveSmtpFrom() {
  const explicit = process.env.SMTP_FROM?.trim();
  if (explicit && explicit.includes("@")) return explicit;

  const user = process.env.SMTP_USER?.trim();
  if (user) {
    if (explicit && !explicit.includes("@")) {
      return `${explicit} <${user}>`;
    }
    return `Mayonity <${user}>`;
  }

  return `Mayonity <${DEFAULT_NOTIFY_EMAIL}>`;
}

export async function sendMail({ to, subject, html, text, replyTo }) {
  const mailer = getTransporter();
  if (!mailer) {
    console.warn("SMTP is not configured. Skipping email:", subject, "→", to);
    return false;
  }

  const from = resolveSmtpFrom();
  if (/gmail\.com/i.test(process.env.SMTP_USER || "") && /mayonity\.com/i.test(process.env.SMTP_HOST || "")) {
    console.warn("SMTP_USER is Gmail but SMTP_HOST is Mayonity mail — fix .env / server secrets.");
  }

  try {
    await mailer.sendMail({
      from,
      to,
      subject,
      html,
      text,
      replyTo: replyTo || DEFAULT_NOTIFY_EMAIL,
    });
    return true;
  } catch (error) {
    console.error("sendMail failed:", { to, subject, message: error?.message });
    throw error;
  }
}