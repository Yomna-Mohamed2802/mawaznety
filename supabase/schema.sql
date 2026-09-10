-- =====================================================
-- Mawaznety (موازنتي) — Supabase Schema (Firebase Auth)
-- =====================================================
-- AUTHENTICATION: Firebase Auth (NOT Supabase Auth)
-- DATABASE: Supabase PostgreSQL
-- IDENTITY: Firebase UID stored in tables
-- SECURITY: RLS prevents unauthorized reads.
--           Sensitive writes go through server-side API
--           with Firebase token verification.
--           Client INSERT allowed only for public ops
--           (analytics, email) with validation.
-- =====================================================

-- 1. USER PROFILES
-- Stores profile data synced from Firebase Auth.
-- Only server-side API can SELECT (admin dashboard).
-- Client can INSERT/UPDATE via server-side API only.
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT UNIQUE NOT NULL,
  email TEXT,
  name TEXT DEFAULT 'User',
  avatar TEXT,
  provider TEXT DEFAULT 'unknown',
  is_admin BOOLEAN DEFAULT false,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_login TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_firebase_uid ON user_profiles(firebase_uid);

-- 2. VOTES
-- One row per user per voting category.
-- user_id is set server-side from Firebase token (never from client body).
-- Duplicate prevention via UNIQUE(category_id, user_id).
CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id TEXT NOT NULL,
  option_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(category_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_votes_category ON votes(category_id);
CREATE INDEX IF NOT EXISTS idx_votes_user ON votes(user_id);

-- 3. VOTE COUNTS (SECURITY DEFINER function)
-- Public can read aggregated counts only via RPC.
-- No individual user IDs exposed.
-- Views are replaced by functions to bypass RLS on underlying tables.
DROP VIEW IF EXISTS vote_counts;

CREATE OR REPLACE FUNCTION get_vote_counts(p_category_id TEXT)
RETURNS TABLE(option_id TEXT, vote_count BIGINT)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT v.option_id, COUNT(*)::BIGINT
  FROM votes v
  WHERE v.category_id = p_category_id
  GROUP BY v.option_id;
$$;

GRANT EXECUTE ON FUNCTION get_vote_counts(text) TO anon;
GRANT EXECUTE ON FUNCTION get_vote_counts(text) TO authenticated;

-- 4. QUIZ SCORES
-- user_id is set server-side from Firebase token (never from client body).
-- Client CANNOT SELECT raw scores (prevents data leakage).
-- Leaderboard uses safe view below.
CREATE TABLE IF NOT EXISTS quiz_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,
  best_score INT DEFAULT 0,
  total_attempts INT DEFAULT 0,
  last_score INT DEFAULT 0,
  last_attempt TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  history JSONB DEFAULT '[]'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_quiz_scores_best ON quiz_scores(best_score DESC);

-- 5. LEADERBOARD (SECURITY DEFINER function)
-- Public can read leaderboard with rank, score, attempts only.
-- NO user_id, NO history, NO timestamps, NO sensitive data.
DROP VIEW IF EXISTS leaderboard_view;

CREATE OR REPLACE FUNCTION get_leaderboard(p_top_n INT DEFAULT 10)
RETURNS TABLE(rank BIGINT, best_score INT, total_attempts INT)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT
    ROW_NUMBER() OVER (ORDER BY q.best_score DESC),
    q.best_score,
    q.total_attempts
  FROM quiz_scores q
  ORDER BY q.best_score DESC
  LIMIT p_top_n;
$$;

GRANT EXECUTE ON FUNCTION get_leaderboard(int) TO anon;
GRANT EXECUTE ON FUNCTION get_leaderboard(int) TO authenticated;

-- 6. ANALYTICS EVENTS
-- Client can INSERT events (application validates event_name against allowlist).
-- Client CANNOT SELECT/UPDATE/DELETE (admin only via server-side).
-- event_name is constrained to allowed values.
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL CHECK (event_name IN (
    'totalVisitors', 'questionsAsked', 'quizzesCompleted',
    'totalVotes', 'page_view', 'chatbot_message'
  )),
  page TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_page ON analytics_events(page);

-- 7. EMAIL SUBSCRIBERS
-- Client can INSERT (application validates email format).
-- Email is normalized to lowercase and trimmed.
-- Client CANNOT SELECT/UPDATE/DELETE (admin only via server-side).
CREATE TABLE IF NOT EXISTS email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  consent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. SITE SETTINGS
-- Client can READ (public settings).
-- Client CANNOT INSERT/UPDATE/DELETE (admin only via server-side).
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL DEFAULT 'siteSettings',
  site_name TEXT DEFAULT 'موازنتي',
  site_description TEXT DEFAULT 'مشروع تعليمي مستقل لموازنة المواطن المصرية 2026/2027',
  allow_registration BOOLEAN DEFAULT true,
  require_approval BOOLEAN DEFAULT false,
  email_notifications BOOLEAN DEFAULT true,
  maintenance_mode BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default settings if not exists
INSERT INTO site_settings (key) VALUES ('siteSettings')
ON CONFLICT (key) DO NOTHING;

-- 9. PUBLIC STATS (SECURITY DEFINER function)
-- Public can read aggregated counts only via RPC.
-- No individual events, no UIDs, no raw data.
DROP VIEW IF EXISTS public_stats;

CREATE OR REPLACE FUNCTION get_public_stats()
RETURNS TABLE(total_visitors BIGINT, questions_asked BIGINT, quizzes_completed BIGINT, total_votes BIGINT)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT
    (SELECT COUNT(*) FROM analytics_events WHERE event_name = 'totalVisitors'),
    (SELECT COUNT(*) FROM analytics_events WHERE event_name = 'questionsAsked'),
    (SELECT COUNT(*) FROM analytics_events WHERE event_name = 'quizzesCompleted'),
    (SELECT COUNT(*) FROM votes);
$$;

GRANT EXECUTE ON FUNCTION get_public_stats() TO anon;
GRANT EXECUTE ON FUNCTION get_public_stats() TO authenticated;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
-- NOTE: Since we use Firebase Auth (not Supabase Auth),
-- RLS cannot verify user identity. RLS prevents
-- unauthorized reads. Sensitive writes go through
-- server-side API with service-role key.
-- =====================================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- USER PROFILES
-- No client INSERT/UPDATE/SELECT (all via server-side API)
DROP POLICY IF EXISTS "profiles_service_only" ON user_profiles;
CREATE POLICY "profiles_service_only" ON user_profiles
  FOR ALL USING (false);

-- VOTES
-- No client INSERT/SELECT (all via server-side API)
DROP POLICY IF EXISTS "votes_service_only" ON votes;
CREATE POLICY "votes_service_only" ON votes
  FOR ALL USING (false);

-- QUIZ SCORES
-- No client INSERT/UPDATE/SELECT (all via server-side API)
DROP POLICY IF EXISTS "quiz_service_only" ON quiz_scores;
CREATE POLICY "quiz_service_only" ON quiz_scores
  FOR ALL USING (false);

-- ANALYTICS EVENTS
-- INSERT: Allow (application validates event_name against allowlist)
-- SELECT: Deny (admin reads via server-side API)
-- UPDATE/DELETE: Deny
DROP POLICY IF EXISTS "analytics_insert_only" ON analytics_events;
CREATE POLICY "analytics_insert_only" ON analytics_events
  FOR INSERT WITH CHECK (true);

-- EMAIL SUBSCRIBERS
-- INSERT: Allow (application validates email format)
-- SELECT: Deny (admin reads via server-side API)
-- UPDATE/DELETE: Deny
DROP POLICY IF EXISTS "emails_insert_only" ON email_subscribers;
CREATE POLICY "emails_insert_only" ON email_subscribers
  FOR INSERT WITH CHECK (true);

-- SITE SETTINGS
-- SELECT: Allow (public settings)
-- INSERT/UPDATE/DELETE: Deny (admin only via server-side API)
DROP POLICY IF EXISTS "settings_select_only" ON site_settings;
CREATE POLICY "settings_select_only" ON site_settings
  FOR SELECT USING (true);
