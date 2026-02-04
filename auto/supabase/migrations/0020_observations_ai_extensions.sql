-- =========================================
-- Extend observations for AI & imports
-- =========================================

alter table public.observations
add column if not exists source text
check (source in ('manual', 'import')) default 'manual';

alter table public.observations
add column if not exists import_id uuid
references public.imports(id) on delete set null;

alter table public.observations
add column if not exists ai_category text;

alter table public.observations
add column if not exists ai_risk text;

alter table public.observations
add column if not exists ai_confidence real;

alter table public.observations
add column if not exists ai_root_causes text[];

create index if not exists idx_obs_import_id
on public.observations (import_id);

create index if not exists idx_obs_ai_category
on public.observations (ai_category);

create index if not exists idx_obs_ai_risk
on public.observations (ai_risk);
