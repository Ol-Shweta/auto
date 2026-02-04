-- =========================================
-- Historic data imports
-- =========================================

create table if not exists public.imports (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  uploaded_by uuid references auth.users(id) on delete set null,
  total_rows integer not null default 0,
  processed_rows integer not null default 0,
  status text not null check (
    status in ('pending', 'processing', 'completed', 'failed')
  ),
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists idx_imports_created_at
on public.imports (created_at desc);
