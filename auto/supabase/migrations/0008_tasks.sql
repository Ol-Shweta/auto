create table if not exists tasks (
  id bigserial primary key,
  title text not null,
  description text,
  assigned_to uuid,
  status text default 'pending',
  due_date date,
  created_at timestamptz default now()
);
