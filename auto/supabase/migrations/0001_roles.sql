create table if not exists roles (
  id bigserial primary key,
  role_name text unique not null,
  description text,
  created_at timestamptz default now()
);

insert into roles (role_name, description) values
  ('admin', 'Full access'),
  ('safety_officer', 'Manages safety operations'),
  ('auditor', 'Performs audits'),
  ('employee', 'Basic account')
on conflict (role_name) do nothing;
