"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

interface SlackEvent {
  id: number;
  event_type: string;
  text: string | null;
  user_id: string | null;
  channel: string | null;
  ts: string | null;
  inserted_at: string;
}

export default function RecentActivity() {
  const [events, setEvents] = useState<SlackEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function load() {
      setLoading(true);

      const res = await fetch(`/api/slack/history?limit=20&filter=${filter}`);
      const data = await res.json();

      setEvents(data.events || []);
      setLoading(false);
    }

    load();
  }, [filter]);

  return (
    <Card className="p-4 w-full">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Slack Activity</h2>

        {/* FILTER CONTROLS */}
        <select
          className="border rounded px-2 py-1 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Events</option>
          <option value="message">Messages</option>
          <option value="reaction">Reactions</option>
          <option value="app_mention">Mentions</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      )}

      {!loading && events.length === 0 && (
        <p className="text-sm text-gray-500 py-4 text-center">
          No Slack events found.
        </p>
      )}

      <div className="space-y-3">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
          >
            <div className="flex justify-between mb-1">
              <span className="font-medium text-sm capitalize">
                {ev.event_type}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(ev.inserted_at).toLocaleString()}
              </span>
            </div>

            <p className="text-sm mb-1">{ev.text || "No text"}</p>

            <div className="text-xs text-gray-500">
              Channel: {ev.channel || "Unknown"} | User: {ev.user_id || "N/A"}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
