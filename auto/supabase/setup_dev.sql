-- ======================================
-- SETUP DEV DATABASE FOR OligoQHSE PROJECT
-- ======================================

-- =========================
-- MIGRATIONS
-- =========================

-- Roles, profiles, and user_roles
\i 'supabase/migrations/0001_roles.sql'
\i 'supabase/migrations/0002_profiles.sql'
\i 'supabase/migrations/0003_user_roles.sql'

-- Slack events
\i 'supabase/migrations/0004_slack_events.sql'

-- Observations
\i 'supabase/migrations/0005_observations.sql'
\i 'supabase/migrations/0006_observation_categories.sql'
\i 'supabase/migrations/0007_observation_types.sql'

-- Tasks, audit log, attachments, AI
\i 'supabase/migrations/0008_tasks.sql'
\i 'supabase/migrations/0009_audit_log.sql'
\i 'supabase/migrations/0010_attachments.sql'
\i 'supabase/migrations/0011_ai_analysis.sql'

-- Additional tables
\i 'supabase/migrations/0012_departments.sql'
\i 'supabase/migrations/0013_notifications.sql'
\i 'supabase/migrations/0014_comments.sql'
\i 'supabase/migrations/0015_settings.sql'
\i 'supabase/migrations/0016_activity_logs.sql'
\i 'supabase/migrations/0017_checklists.sql'
\i 'supabase/migrations/0018_incident_reports.sql'

-- =========================
-- ENABLE RLS & APPLY POLICIES
-- =========================
\i 'supabase/policies/rls_policies.sql'

-- =========================
-- SEED DATA
-- =========================
\i 'supabase/seed.sql'

-- =========================
-- DONE
-- =========================
