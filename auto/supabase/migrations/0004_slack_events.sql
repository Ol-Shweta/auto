create table if not exists slack_events (
  id bigserial primary key,
  event_type text,
  text text,
  user_id text,
  channel text,
  ts text,
  full_event jsonb,
  inserted_at timestamptz default now()
);

create index if not exists idx_slack_events_channel on slack_events(channel);
create index if not exists idx_slack_events_inserted_at on slack_events(inserted_at);
