"use client";

import React from "react";

export interface SlackEvent {
  id: number;
  event_type: string;
  text: string | null;
  user_id: string | null;
  channel: string | null;
  ts: string | null;
  full_event: any;
  inserted_at: string;
}

interface SlackTimelineProps {
  events: SlackEvent[];
}

export function SlackTimeline({ events }: SlackTimelineProps) {
  return (
    <div className="border-l pl-4 space-y-4 mt-6">
      {events.map((ev: SlackEvent) => (
        <div key={ev.id} className="relative">
          <div className="absolute -left-2 top-1 w-3 h-3 bg-blue-500 rounded-full" />
          <div className="ml-2">
            <div className="text-sm font-semibold">
              {ev.event_type} – {ev.channel}
            </div>

            {ev.text && (
              <div className="text-gray-600 text-sm">{ev.text}</div>
            )}

            <div className="text-xs text-gray-400 mt-1">
              {new Date(ev.inserted_at).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
