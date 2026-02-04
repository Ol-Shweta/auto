-- =====================================
-- SETTINGS
-- =====================================
-- Purpose:
--  - Store system, organization, and user preferences
--  - Used for notifications, AI behavior, UI configuration
-- =====================================

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),

  -- Scope
  scope text not null check (scope in ('system', 'organization', 'user')),
  user_id uuid references auth.users(id) on delete cascade,

  -- Key-value configuration
  key text not null,
  value jsonb not null,

  -- Metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Prevent duplicates
  unique (scope, user_id, key)
);

-- -------------------------------------
-- Indexes
-- -------------------------------------

create index if not exists idx_settings_scope
  on public.settings (scope);

create index if not exists idx_settings_user
  on public.settings (user_id);

-- -------------------------------------
-- Trigger: auto-update updated_at
-- -------------------------------------

create or replace function public.set_settings_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_settings_updated_at
before update on public.settings
for each row
execute function public.set_settings_updated_at();
