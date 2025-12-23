create table if not exists attachments (
  id bigserial primary key,
  observation_id bigint,
  file_url text,
  file_type text,
  created_at timestamptz default now(),

  foreign key (observation_id) references observations(id)
);
