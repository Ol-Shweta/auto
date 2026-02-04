-- =========================
-- ENABLE RLS ON ALL TABLES
-- =========================

-- Enable RLS
alter table profiles enable row level security;
alter table roles enable row level security;
alter table user_roles enable row level security;
alter table slack_events enable row level security;
alter table observations enable row level security;
alter table observation_categories enable row level security;
alter table observation_types enable row level security;
alter table tasks enable row level security;
alter table audit_log enable row level security;
alter table attachments enable row level security;
alter table ai_analysis enable row level security;
alter table departments enable row level security;
alter table notifications enable row level security;
alter table comments enable row level security;
alter table settings enable row level security;
alter table activity_logs enable row level security;
alter table checklists enable row level security;
alter table incident_reports enable row level security;

-- =====================================
-- HELPER: admins
-- =====================================
-- Supabase JWT must have role claim
-- Example: auth.jwt() ->> 'role'

-- =========================
-- PROFILES
-- =========================
create policy "Admins can read all profiles"
  on profiles
  for select
  using (auth.jwt() ->> 'role' = 'admin');

create policy "Users can read own profile"
  on profiles
  for select
  using (auth.jwt() ->> 'sub' = id);

create policy "Admins can update any profile"
  on profiles
  for update
  using (auth.jwt() ->> 'role' = 'admin');

create policy "Users can update own profile"
  on profiles
  for update
  using (auth.jwt() ->> 'sub' = id);

-- =========================
-- ROLES
-- =========================
create policy "Admins can manage roles"
  on roles
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

-- =========================
-- USER_ROLES
-- =========================
create policy "Admins can manage user_roles"
  on user_roles
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

-- =========================
-- SLACK_EVENTS
-- =========================
create policy "Admins can read all Slack events"
  on slack_events
  for select
  using (auth.jwt() ->> 'role' = 'admin');

create policy "Safety officers can read Slack events"
  on slack_events
  for select
  using (auth.jwt() ->> 'role' = 'safety_officer');

create policy "Admins can insert Slack events"
  on slack_events
  for insert
  with check (auth.jwt() ->> 'role' in ('admin','safety_officer'));

-- =========================
-- OBSERVATIONS
-- =========================
create policy "Admins can manage all observations"
  on observations
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

create policy "Safety officers can manage own observations"
  on observations
  for all
  using (auth.jwt() ->> 'role' = 'safety_officer')
  with check (auth.jwt() ->> 'role' = 'safety_officer');

create policy "Users can read own observations"
  on observations
  for select
  using (reporter_id = auth.jwt() ->> 'sub');

-- =========================
-- OBSERVATION_CATEGORIES & TYPES
-- =========================
create policy "Admins can manage categories"
  on observation_categories
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

create policy "Admins can manage types"
  on observation_types
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

-- =========================
-- TASKS
-- =========================
create policy "Admins can manage all tasks"
  on tasks
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

create policy "Assigned users can update own tasks"
  on tasks
  for update
  using (assigned_to = auth.jwt() ->> 'sub')
  with check (assigned_to = auth.jwt() ->> 'sub');

create policy "Users can read tasks assigned to them"
  on tasks
  for select
  using (assigned_to = auth.jwt() ->> 'sub');

-- =========================
-- AUDIT_LOGS & ACTIVITY_LOGS
-- =========================
create policy "Admins can read all audit and activity logs"
  on audit_log for select using (auth.jwt() ->> 'role' = 'admin');

create policy "Admins can read all activity logs"
  on activity_logs for select using (auth.jwt() ->> 'role' = 'admin');

-- =========================
-- ATTACHMENTS
-- =========================
create policy "Admins can manage attachments"
  on attachments
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

-- =========================
-- AI_ANALYSIS
-- =========================
create policy "Admins can manage AI analysis"
  on ai_analysis
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

-- =========================
-- DEPARTMENTS
-- =========================
create policy "Admins can manage departments"
  on departments
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

-- =========================
-- NOTIFICATIONS
-- =========================
create policy "Users can read own notifications"
  on notifications
  for select
  using (user_id = auth.jwt() ->> 'sub');

create policy "Admins can manage notifications"
  on notifications
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

-- =========================
-- COMMENTS
-- =========================
create policy "Users can insert comments"
  on comments
  for insert
  using (user_id = auth.jwt() ->> 'sub')
  with check (user_id = auth.jwt() ->> 'sub');

create policy "Admins can read all comments"
  on comments
  for select
  using (auth.jwt() ->> 'role' = 'admin');

-- =========================
-- SETTINGS
-- =========================
create policy "Admins can manage settings"
  on settings
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

-- =========================
-- CHECKLISTS
-- =========================
create policy "Admins can manage checklists"
  on checklists
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

-- =========================
-- INCIDENT REPORTS
-- =========================
create policy "Admins can manage incidents"
  on incident_reports
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

create policy "Safety officers can manage incidents"
  on incident_reports
  for all
  using (auth.jwt() ->> 'role' = 'safety_officer')
  with check (auth.jwt() ->> 'role' = 'safety_officer');

create policy "Users can read incidents they reported"
  on incident_reports
  for select
  using (reporter_id = auth.jwt() ->> 'sub');


-- =========================
-- ENABLE RLS (NEW TABLES)
-- =========================

alter table imports enable row level security;
alter table import_errors enable row level security;
-- =========================

-- =========================
-- IMPORTS
-- =========================

-- Admins can manage all imports
create policy "Admins can manage imports"
  on imports
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

-- Safety officers & managers can read imports
create policy "Safety officers can read imports"
  on imports
  for select
  using (auth.jwt() ->> 'role' in ('safety_officer', 'manager'));
-- =========================

-- =========================
-- IMPORT_ERRORS
-- =========================

-- Admins can manage import errors
create policy "Admins can manage import errors"
  on import_errors
  for all
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

-- Safety officers & managers can read import errors
create policy "Safety officers can read import errors"
  on import_errors
  for select
  using (auth.jwt() ->> 'role' in ('safety_officer', 'manager'));
-- =========================

