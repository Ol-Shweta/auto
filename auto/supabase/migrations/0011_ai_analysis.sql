create table if not exists ai_analysis (
  id bigserial primary key,
  observation_id bigint,
  analysis jsonb,
  risk_score numeric,
  created_at timestamptz default now(),

  foreign key (observation_id) references observations(id)
);
