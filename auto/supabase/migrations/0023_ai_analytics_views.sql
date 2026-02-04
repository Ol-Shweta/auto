-- =========================================
-- Observations by AI Category
-- =========================================

create or replace view public.v_ai_observations_by_category as
select
  ai_category,
  count(*) as total
from public.observations
where ai_category is not null
group by ai_category;

-- =========================================
-- Monthly Risk Trends
-- =========================================

create or replace view public.v_ai_risk_trends_monthly as
select
  date_trunc('month', created_at) as month,
  ai_risk,
  count(*) as total
from public.observations
where ai_risk is not null
group by month, ai_risk
order by month desc;
