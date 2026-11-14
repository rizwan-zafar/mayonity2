/**
 * Smoke-test SMTP from your machine before production.
 * Usage: npm run test:smtp
 * Requires `.env` with SMTP_* (see .env.example).
 */
import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const user = process.env.SMTP_USER;
const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");

if (!host || !user || !pass) {
  console.error("Missing SMTP_HOST, SMTP_USER, or SMTP_PASS in environment (.env).");
  process.exit(1);
}

const port = Number(process.env.SMTP_PORT || 587);
const secure = process.env.SMTP_SECURE === "true" || port === 465;
const notify =
  process.env.ADMIN_NOTIFY_EMAIL?.trim() || process.env.SMTP_USER?.trim() || "hello@mayonity.com";

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
  tls: {
    rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
  },
});

async function main() {
  console.log(`Verifying SMTP ${host}:${port} (secure=${secure}) as ${user}...`);
  await transporter.verify();
  console.log("SMTP connection OK.");

  const from = process.env.SMTP_FROM || user;
  const info = await transporter.sendMail({
    from,
    to: notify,
    subject: "Mayonity SMTP test (local)",
    text: "If you received this, contact-form email is configured correctly.",
    html: "<p>If you received this, contact-form email is configured correctly.</p>",
  });

  console.log("Test message sent:", info.messageId);
  console.log("Inbox checked:", notify);
}

main().catch((err) => {
  console.error("SMTP test failed:", err);
  process.exit(1);
});