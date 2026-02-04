-- =====================================
-- NOTIFICATIONS
-- =====================================
-- Purpose:
--  - System + user notifications
--  - Used for tasks, incidents, observations, AI alerts, imports
-- =====================================

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),

  -- Recipient
  user_id uuid not null references auth.users(id) on delete cascade,

  -- Notification content
  title text not null,
  message text,
  type text not null,               -- e.g. task, incident, ai_alert, system
  severity text default 'info',      -- info | warning | critical

  -- Linking (optional)
  entity_type text,                 -- observation | task | incident | import
  entity_id uuid,

  -- State
  is_read boolean not null default false,

  -- Metadata
  created_at timestamptz not null default now(),
  read_at timestamptz
);

-- -------------------------------------
-- Indexes
-- -------------------------------------

create index if not exists idx_notifications_user
  on public.notifications (user_id);

create index if not exists idx_notifications_is_read
  on public.notifications (is_read);

create index if not exists idx_notifications_type
  on public.notifications (type);

create index if not exists idx_notifications_entity
  on public.notifications (entity_type, entity_id);

create index if not exists idx_notifications_created_at
  on public.notifications (created_at desc);

-- -------------------------------------
-- Trigger: auto-set read_at
-- -------------------------------------

create or replace function public.set_notification_read_at()
returns trigger as $$
begin
  if new.is_read = true and old.is_read = false then
    new.read_at = now();
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_notifications_read_at
before update on public.notifications
for each row
execute function public.set_notification_read_at();
