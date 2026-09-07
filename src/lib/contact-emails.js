import { sendMail } from "@/lib/mail";

const ADMIN_INBOX = "mayonitynetwork@gmail.com";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function field(label, value) {
  const text = String(value || "").trim();
  return text ? text : "—";
}

function layout(title, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:Georgia,'Times New Roman',serif;color:#1a1d26;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e6e8ee;">
          <tr>
            <td style="padding:28px 32px;background:#0b0d14;color:#ffffff;">
              <p style="margin:0;letter-spacing:0.28em;font-size:12px;font-family:Arial,Helvetica,sans-serif;text-transform:uppercase;color:#3ee0c8;">Mayonity</p>
              <h1 style="margin:10px 0 0;font-size:24px;font-weight:normal;line-height:1.3;">${escapeHtml(title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;font-size:16px;line-height:1.7;color:#2c3140;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#fafbfc;font-size:12px;line-height:1.6;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">
              Mayonity · Software for what comes next<br />
              <a href="https://mayonity.com" style="color:#0b0d14;">mayonity.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function userEmail(data) {
  const first = data.name.split(" ")[0] || data.name;
  const html = layout(
    "We received your message",
    `<p>Dear ${escapeHtml(first)},</p>
     <p>Thank you for writing to Mayonity. This is a confirmation that your enquiry has been received successfully.</p>
     <p>A member of our team will review your note and get back to you shortly. If your matter is urgent, you may also reach us at <a href="mailto:mayonitynetwork@gmail.com" style="color:#0b0d14;">mayonitynetwork@gmail.com</a>.</p>
     <p style="margin-top:28px;">With kind regards,<br /><strong>The Mayonity team</strong></p>`
  );
  const text = `Dear ${first},

Thank you for writing to Mayonity. This is a confirmation that your enquiry has been received successfully.

A member of our team will review your note and get back to you shortly. If your matter is urgent, you may also reach us at mayonitynetwork@gmail.com.

With kind regards,
The Mayonity team`;
  return { html, text };
}

function adminEmail(data) {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Company", data.company],
    ["Service", data.service],
    ["Budget", data.budget],
    ["Message", data.message],
  ]
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #eef0f4;width:120px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b7280;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eef0f4;white-space:pre-wrap;">${escapeHtml(field(label, value))}</td>
        </tr>`
    )
    .join("");

  const html = layout(
    "New Contact Us enquiry",
    `<p>Someone submitted the Contact Us form on mayonity.com. Details are below.</p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">${rows}</table>
     <p style="margin-top:24px;font-size:14px;color:#6b7280;">This message was generated automatically. Reply directly to the sender using their email address.</p>`
  );
  const text = `New Contact Us enquiry

Name: ${field("Name", data.name)}
Email: ${field("Email", data.email)}
Phone: ${field("Phone", data.phone)}
Company: ${field("Company", data.company)}
Service: ${field("Service", data.service)}
Budget: ${field("Budget", data.budget)}

Message:
${field("Message", data.message)}`;
  return { html, text };
}

export async function sendContactNotificationEmails(data) {
  const user = userEmail(data);
  const admin = adminEmail(data);

  const results = await Promise.allSettled([
    sendMail({
      to: data.email,
      subject: "Mayonity — we received your message",
      html: user.html,
      text: user.text,
    }),
    sendMail({
      to: ADMIN_INBOX,
      subject: `New Contact Us enquiry from ${data.name}`,
      html: admin.html,
      text: admin.text,
      replyTo: data.email,
    }),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Contact email failed:", result.reason);
    }
  }
}
