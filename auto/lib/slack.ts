export async function sendSlackMessage(channel: string, text: string) {
  const token = process.env.SLACK_BOT_TOKEN;

  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      channel,
      text,
    }),
  });

  const data = await res.json();
  console.log("Slack response:", data);
  return data;
}
