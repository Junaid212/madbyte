import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/validation";

/**
 * ─── BACKEND INTEGRATION POINT ───────────────────────────────────────────
 * This route validates the enquiry, then forwards it to whatever you
 * configure. Out of the box NOTHING is stored or emailed.
 *
 *   • Set CONTACT_WEBHOOK_URL to POST the JSON payload to a webhook
 *     (Zapier, Make, n8n, Slack incoming webhook, your own API...).
 *   • Or replace `deliver()` with a direct integration (Resend, Postmark,
 *     SendGrid, a database insert...). See README.md for a Resend example.
 *
 * With no integration configured the route answers 501 so the UI can tell
 * the visitor honestly that their message was not delivered.
 */
async function deliver(payload: ContactPayload): Promise<"sent" | "not_configured"> {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return "not_configured";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, website: undefined, receivedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return "sent";
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    const result = await deliver(body as ContactPayload);
    if (result === "not_configured") {
      return NextResponse.json({ ok: false, error: "Contact delivery is not configured." }, { status: 501 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return NextResponse.json({ ok: false, error: "Delivery failed." }, { status: 502 });
  }
}
