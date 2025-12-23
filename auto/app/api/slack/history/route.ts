import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://slack.com/api/conversations.history", {
    headers: {
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!data.ok) {
    return NextResponse.json({ error: data.error }, { status: 400 });
  }

  return NextResponse.json(data.messages);
}
