// lib/slack/types.ts

export interface SlackEventBase {
  team_id: string;
  event_id: string;
  type: string;
  event_ts: string;
  authed_user_id?: string;
}

export interface SlackMessageEvent extends SlackEventBase {
  subtype?: string;
  user: string;
  text: string;
  channel: string;
  ts: string;
}

export interface SlackReactionEvent extends SlackEventBase {
  user: string;
  reaction: string;
  item: {
    type: string;
    channel: string;
    ts: string;
  };
  item_user: string;
  e
