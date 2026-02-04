-- =====================================
-- COMMENTS
-- =====================================
-- Purpose:
--  - Threaded comments on observations, incidents, tasks, imports
--  - Used for collaboration, investigation notes, corrective actions
-- =====================================

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),

  -- Author
  user_id uuid not null references auth.users(id) on delete cascade,

  -- Target entity
  entity_type text not null,          -- observation | incident | task | import
  entity_id uuid not null,

  -- Threading
  parent_comment_id uuid
    references public.comments(id)
    on delete cascade,

  -- Content
  content text not null,

  -- Metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -------------------------------------
-- Indexes
-- -------------------------------------

create index if not exists idx_comments_entity
  on public.comments (entity_type, entity_id);

create index if not exists idx_comments_user
  on public.comments (user_id);

create index if not exists idx_comments_parent
  on public.comments (parent_comment_id);

create index if not exists idx_comments_created_at
  on public.comments (created_at desc);

-- -------------------------------------
-- Trigger: auto-update updated_at
-- -------------------------------------

create or replace function public.set_comments_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_comments_updated_at
before update on public.comments
for each row
execute function public.set_comments_updated_at();
