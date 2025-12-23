import { NextResponse } from "next/server";
import crypto from "crypto";

function verifySlackSignature(req: Request, body: string) {
  const timestamp = req.headers.get("x-slack-request-timestamp");
  const signature = req.headers.get("x-slack-signature");

  if (!timestamp || !signature) return false;

  const sigBase = `v0:${timestamp}:${body}`;
  const hmac = crypto
    .createHmac("sha256", process.env.SLACK_SIGNING_SECRET!)
    .update(sigBase)
    .digest("hex");

  return `v0=${hmac}` === signature;
}

export async function POST(req: Request) {
  const body = await req.text();

  if (!verifySlackSignature(req, body)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(body);

  // URL verification challenge
  if (payload.type === "url_verification") {
    return NextResponse.json({ challenge: payload.challenge });
  }

  // Handle events
  if (payload.event?.type === "message") {
    console.log("Slack message:", payload.event.text);
  }

  return NextResponse.json({ ok: true });
}
