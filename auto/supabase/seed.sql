-- ================================
-- DEMO SEED DATA FOR DEV ENVIRONMENT
-- ================================

-- ---------------------
-- ROLES
-- ---------------------
insert into roles (role_name, description) values
  ('admin', 'Full access'),
  ('safety_officer', 'Manages safety operations'),
  ('auditor', 'Performs audits'),
  ('employee', 'Basic account')
on conflict (role_name) do nothing;

-- ---------------------
-- PROFILES (USERS)
-- ---------------------
insert into profiles (id, email, full_name, avatar_url)
values
  ('00000000-0000-0000-0000-000000000001', 'admin@example.com', 'Admin User', null),
  ('00000000-0000-0000-0000-000000000002', 'john@example.com', 'John Worker', null),
  ('00000000-0000-0000-0000-000000000003', 'auditor@example.com', 'Auditor One', null)
on conflict do nothing;

-- ---------------------
-- USER ROLES
-- ---------------------
insert into user_roles (user_id, role_id)
select '00000000-0000-0000-0000-000000000001', id from roles where role_name='admin'
on conflict do nothing;

insert into user_roles (user_id, role_id)
select '00000000-0000-0000-0000-000000000002', id from roles where role_name='employee'
on conflict do nothing;

insert into user_roles (user_id, role_id)
select '00000000-0000-0000-0000-000000000003', id from roles where role_name='auditor'
on conflict do nothing;

-- ---------------------
-- DEPARTMENTS / LOCATIONS
-- ---------------------
insert into departments (name, description)
values
  ('Site A', 'Main Oil & Gas site'),
  ('Site B', 'Secondary storage site')
on conflict do nothing;

-- ---------------------
-- OBSERVATION CATEGORIES
-- ---------------------
insert into observation_categories (category_name)
values
  ('Fire Safety'),
  ('Electrical Safety'),
  ('Environmental'),
  ('Equipment Safety')
on conflict do nothing;

-- ---------------------
-- OBSERVATION TYPES
-- ---------------------
insert into observation_types (type_name)
values
  ('Unsafe Act'),
  ('Unsafe Condition'),
  ('Positive Observation')
on conflict do nothing;

-- ---------------------
-- OBSERVATIONS
-- ---------------------
insert into observations (title, description, category_id, type_id, location, reporter_id)
values
  ('Oil spill near compressor', 'Leak detected in pump station', 3, 2, 'Site A', '00000000-0000-0000-0000-000000000002'),
  ('PPE violation', 'Worker found without helmet', 1, 1, 'Site B', '00000000-0000-0000-0000-000000000002')
on conflict do nothing;

-- ---------------------
-- ATTACHMENTS
-- ---------------------
insert into attachments (observation_id, file_url, file_type)
values
  (1, 'https://example.com/photo1.jpg', 'image/jpeg'),
  (2, 'https://example.com/photo2.jpg', 'image/jpeg')
on conflict do nothing;

-- ---------------------
-- AI ANALYSIS
-- ---------------------
insert into ai_analysis (observation_id, analysis, risk_score)
values
  (1, '{"risk":"medium"}'::jsonb, 6.5),
  (2, '{"risk":"high"}'::jsonb, 8.2)
on conflict do nothing;

-- ---------------------
-- TASKS
-- ---------------------
insert into tasks (title, description, assigned_to, status, due_date)
values
  ('Fix loose cable', 'Repair main power cable at Site A', '00000000-0000-0000-0000-000000000002', 'pending', '2025-12-20'),
  ('Review safety SOP', 'Review & update fire SOP', '00000000-0000-0000-0000-000000000003', 'in_progress', '2025-12-25')
on conflict do nothing;

-- ---------------------
-- AUDIT LOGS
-- ---------------------
insert into audit_log (user_id, action, entity, entity_id)
values
  ('00000000-0000-0000-0000-000000000001', 'created', 'observation', 1),
  ('00000000-0000-0000-0000-000000000002', 'updated', 'task', 1)
on conflict do nothing;

-- ---------------------
-- ACTIVITY LOGS
-- ---------------------
insert into activity_logs (user_id, action, entity, entity_id, meta)
values
  ('00000000-0000-0000-0000-000000000001', 'login', 'profile', 1, '{"ip":"127.0.0.1"}'::jsonb),
  ('00000000-0000-0000-0000-000000000002', 'commented', 'observation', 1, '{"comment":"Check the leak"}'::jsonb)
on conflict do nothing;

-- ---------------------
-- SLACK EVENTS
-- ---------------------
insert into slack_events (event_type, text, user_id, channel, ts, full_event)
values
  ('message', 'Daily safety briefing completed.', 'U12345', '#safety', '1711465030.1234', '{"ok":true}'::jsonb),
  ('reaction_added', 'Added :warning: to incident report.', 'U67890', '#alerts', '1711468880.5678', '{"ok":true}'::jsonb)
on conflict do nothing;

-- ---------------------
-- NOTIFICATIONS
-- ---------------------
insert into notifications (user_id, type, title, message, read)
values
  ('00000000-0000-0000-0000-000000000002', 'slack', 'New Observation', 'You have a new observation assigned', false),
  ('00000000-0000-0000-0000-000000000003', 'system', 'Task Updated', 'Review safety SOP task', false)
on conflict do nothing;

-- ---------------------
-- COMMENTS
-- ---------------------
insert into comments (user_id, observation_id, comment)
values
  ('00000000-0000-0000-0000-000000000003', 1, 'Please check this observation immediately'),
  ('00000000-0000-0000-0000-000000000002', 2, 'Safety helmets must be worn')
on conflict do nothing;

-- ---------------------
-- SETTINGS
-- ---------------------
insert into settings (key, value, description)
values
  ('slack_bot_token', 'xoxb-1234567890', 'Slack bot authentication token'),
  ('ai_risk_threshold', '7', 'Risk threshold for AI alerts')
on conflict do nothing;

-- ---------------------
-- CHECKLISTS
-- ---------------------
insert into checklists (name, description, created_by)
values
  ('Fire Safety Checklist', 'Daily fire safety checklist', '00000000-0000-0000-0000-000000000001'),
  ('Electrical Safety Checklist', 'Daily electrical inspection', '00000000-0000-0000-0000-000000000001')
on conflict do nothing;

-- ---------------------
-- INCIDENT REPORTS
-- ---------------------
insert into incident_reports (title, description, location_id, reporter_id, status, severity)
values
  ('Gas leak at Site A', 'Detected gas leak in compressor area', 1, '00000000-0000-0000-0000-000000000002', 'open', 'high'),
  ('Minor fire at Site B', 'Small fire in storage area', 2, '00000000-0000-0000-0000-000000000003', 'closed', 'medium')
on conflict do nothing;
