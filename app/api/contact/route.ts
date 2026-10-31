import { NextResponse } from "next/server";

const MAX_LENGTHS = { name: 120, email: 200, phone: 40, company: 160, message: 4000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Resend's shared sender. Replace it with an address on the verified domain once the domain is live.
const SENDER = "PrimeDesk Website <onboarding@resend.dev>";

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field: report success and send nothing.
  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  const name = text(body.name, MAX_LENGTHS.name);
  const email = text(body.email, MAX_LENGTHS.email);
  const phone = text(body.phone, MAX_LENGTHS.phone);
  const company = text(body.company, MAX_LENGTHS.company);
  const message = text(body.message, MAX_LENGTHS.message);
  const needs = Array.isArray(body.needs) ? body.needs.map((need) => text(need, 80)).filter(Boolean).slice(0, 10) : [];

  if (!name || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL;
  if (!apiKey || !recipient) {
    console.error("Contact form is missing RESEND_API_KEY or CONTACT_NOTIFICATION_EMAIL.");
    return NextResponse.json({ error: "The contact form is not configured." }, { status: 500 });
  }

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Company", company],
    ["Needs help with", needs.join(", ")],
    ["Message", message],
  ].filter(([, value]) => value);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: SENDER,
      to: [recipient],
      reply_to: email,
      subject: `New website enquiry from ${name.replace(/[\r\n]+/g, " ")}`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: rows.map(([label, value]) => `<p><strong>${label}:</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`).join(""),
    }),
  });

  if (!response.ok) {
    console.error("Resend rejected the contact email.", response.status);
    return NextResponse.json({ error: "The message could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
