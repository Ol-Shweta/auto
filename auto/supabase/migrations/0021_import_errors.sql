-- =========================================
-- Import row-level error tracking
-- =========================================

create table if not exists public.import_errors (
  id uuid primary key default gen_random_uuid(),
  import_id uuid references public.imports(id) on delete cascade,
  row_number integer not null,
  reason text not null,
  raw_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_import_errors_import
on public.import_errors (import_id);
