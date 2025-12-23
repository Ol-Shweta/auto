create table if not exists observations (
  id bigserial primary key,
  title text,
  description text,
  category_id bigint,
  type_id bigint,
  location text,
  reporter_id uuid,
  status text default 'open',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  foreign key (category_id) references observation_categories(id),
  foreign key (type_id) references observation_types(id)
);
