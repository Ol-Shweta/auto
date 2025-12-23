create table if not exists observation_categories (
  id bigserial primary key,
  category_name text not null unique,
  created_at timestamptz default now()
);
