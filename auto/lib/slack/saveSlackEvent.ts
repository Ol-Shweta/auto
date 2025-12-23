// lib/slack/saveSlackEvent.ts
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { SlackSavePayload } from "./types";

export async function saveSlackEvent(payload: SlackSavePayload) {
  const { raw, type, teamId, eventId, eventTs } = payload;

  const { error } = await supabaseAdmin.from("slack_events").insert({
    event_id: eventId,
    team_id: teamId,
    event_ts: eventTs,
    type,
    payload: raw, // JSONB column
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Error inserting Slack event:", error);
    throw new Error("Failed to save Slack event");
  }

  return { success: true };
}
