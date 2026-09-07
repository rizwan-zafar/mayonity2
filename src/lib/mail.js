import nodemailer from "nodemailer";

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

export async function sendMail({ to, subject, html, text, replyTo }) {
  const mailer = getTransporter();
  if (!mailer) {
    console.warn("SMTP is not configured. Skipping email:", subject);
    return false;
  }

  await mailer.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
    text,
    replyTo,
  });
  return true;
}
