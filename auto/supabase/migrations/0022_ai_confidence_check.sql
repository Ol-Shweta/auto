-- =========================================
-- AI confidence validation
-- =========================================

alter table public.observations
add constraint ai_confidence_range
check (
  ai_confidence is null
  or (ai_confidence >= 0 and ai_confidence <= 1)
);
