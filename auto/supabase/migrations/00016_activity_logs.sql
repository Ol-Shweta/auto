-- =====================================
-- ACTIVITY LOGS
-- =====================================
-- Purpose:
--  - Immutable system activity timeline
--  - Used for audits, compliance, traceability
-- =====================================

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),

  -- Actor
  user_id uuid references auth.users(id) on delete set null,

  -- Action
  action text not null,                -- created | updated | deleted | approved
  entity_type text not null,           -- observation | task | incident | user
  entity_id uuid,

  -- Details
  description text,
  metadata jsonb,

  -- Timestamp
  created_at timestamptz not null default now()
);

-- -------------------------------------
-- Indexes
-- -------------------------------------

create index if not exists idx_activity_logs_user
  on public.activity_logs (user_id);

create index if not exists idx_activity_logs_entity
  on public.activity_logs (entity_type, entity_id);

create index if not exists idx_activity_logs_created_at
  on public.activity_logs (created_at desc);
