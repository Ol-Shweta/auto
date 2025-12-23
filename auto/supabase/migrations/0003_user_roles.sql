create table if not exists user_roles (
  id bigserial primary key,
  user_id uuid not null,
  role_id bigint not null references roles(id),
  created_at timestamptz default now(),

  unique (user_id, role_id)
);
