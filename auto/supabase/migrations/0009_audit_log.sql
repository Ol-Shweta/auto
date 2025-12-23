create table if not exists audit_log (
  id bigserial primary key,
  user_id uuid,
  action text,
  entity text,
  entity_id bigint,
  created_at timestamptz default now()
);
