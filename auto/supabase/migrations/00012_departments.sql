-- =====================================
-- DEPARTMENTS
-- =====================================
-- Purpose:
--  - Organize users, observations, tasks, and incidents by department
--  - Used across QHSE reporting, analytics, and access scoping
-- =====================================

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  code text unique,                 -- Optional short code (e.g. HSE, OPS)
  description text,

  -- Ownership & hierarchy
  parent_department_id uuid references public.departments(id) on delete set null,
  manager_id uuid references auth.users(id) on delete set null,

  -- Metadata
  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -------------------------------------
-- Indexes
-- -------------------------------------

create index if not exists idx_departments_name
  on public.departments (name);

create index if not exists idx_departments_manager
  on public.departments (manager_id);

create index if not exists idx_departments_parent
  on public.departments (parent_department_id);

-- -------------------------------------
-- Trigger: auto-update updated_at
-- -------------------------------------

create or replace function public.set_departments_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_departments_updated_at
before update on public.departments
for each row
execute function public.set_departments_updated_at();
