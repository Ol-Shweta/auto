// lib/slack/fetchSlackHistory.ts
import { supabaseServer } from "@/lib/supabase/server";

interface FetchSlackHistoryOptions {
  limit?: number;
  type?: string;
  teamId?: string;
  before?: string; // pagination using event_ts
}

export async function fetchSlackHistory(options: FetchSlackHistoryOptions = {}) {
  const supabase = supabaseServer();
  const { limit = 50, type, teamId, before } = options;

  let query = supabase
    .from("slack_events")
    .select("*")
    .order("event_ts", { ascending: false })
    .limit(limit);

  if (type) query = query.eq("type", type);
  if (teamId) query = query.eq("team_id", teamId);
  if (before) query = query.lt("event_ts", before);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Slack history:", error);
    return [];
  }

  return data;
}
