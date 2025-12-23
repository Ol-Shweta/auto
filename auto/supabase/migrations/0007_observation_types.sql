create table if not exists observation_types (
  id bigserial primary key,
  type_name text not null unique,
  created_at timestamptz default now()
);
