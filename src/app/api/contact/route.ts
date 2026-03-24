import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { contactSchema } from "@/lib/contact-schema";

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  const payload = parsed.data;

  // Always log requests (useful for serverless logs / debugging).
  console.log("[ED10X] New contact request", payload);

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!host || !port || !user || !pass || !to || !from) {
    return NextResponse.json(
      {
        error:
          "Email is not configured on the server. Add SMTP_* and CONTACT_* env vars and redeploy.",
      },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `ED10X Lead — ${payload.adType} — ${payload.company}`;
  const text = [
    `Name: ${payload.name}`,
    `Company: ${payload.company}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Ad Type: ${payload.adType}`,
    `Budget: ${payload.budgetRange}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject,
    text,
  });

  return NextResponse.json({ ok: true });
}

