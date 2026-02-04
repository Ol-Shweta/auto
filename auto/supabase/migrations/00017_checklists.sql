-- =====================================
-- CHECKLISTS
-- =====================================
-- Purpose:
--  - Safety inspections, audits, toolbox talks
--  - Can be reused across departments and sites
-- =====================================

create table if not exists public.checklists (
  id uuid primary key default gen_random_uuid(),

  title text not null,
  description text,

  -- Ownership
  created_by uuid references auth.users(id) on delete set null,
  department_id uuid references public.departments(id) on delete set null,

  -- Status
  is_active boolean not null default true,

  -- Checklist structure
  items jsonb not null,                -- array of checklist items

  -- Metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -------------------------------------
-- Indexes
-- -------------------------------------

create index if not exists idx_checklists_department
  on public.checklists (department_id);

create index if not exists idx_checklists_active
  on public.checklists (is_active);

-- -------------------------------------
-- Trigger: auto-update updated_at
-- -------------------------------------

create or replace function public.set_checklists_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_checklists_updated_at
before update on public.checklists
for each row
execute function public.set_checklists_updated_at();
