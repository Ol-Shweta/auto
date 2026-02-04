-- =====================================
-- INCIDENT REPORTS
-- =====================================
-- Purpose:
--  - Formal incident and near-miss reporting
--  - Supports investigations, corrective actions, audits
-- =====================================

create table if not exists public.incident_reports (
  id uuid primary key default gen_random_uuid(),

  -- Reporter
  reporter_id uuid not null references auth.users(id) on delete cascade,
  department_id uuid references public.departments(id) on delete set null,

  -- Incident details
  title text not null,
  description text not null,
  incident_type text not null,          -- incident | near_miss | injury | damage
  severity text not null,               -- low | medium | high | critical

  -- Timing & location
  occurred_at timestamptz not null,
  location text,

  -- Investigation
  root_cause text,
  corrective_action text,

  -- Status
  status text not null default 'open',  -- open | investigating | closed

  -- Metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -------------------------------------
-- Indexes
-- -------------------------------------

create index if not exists idx_incidents_reporter
  on public.incident_reports (reporter_id);

create index if not exists idx_incidents_department
  on public.incident_reports (department_id);

create index if not exists idx_incidents_status
  on public.incident_reports (status);

create index if not exists idx_incidents_occurred_at
  on public.incident_reports (occurred_at desc);

-- -------------------------------------
-- Trigger: auto-update updated_at
-- -------------------------------------

create or replace function public.set_incident_reports_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_incident_reports_updated_at
before update on public.incident_reports
for each row
execute function public.set_incident_reports_updated_at();
