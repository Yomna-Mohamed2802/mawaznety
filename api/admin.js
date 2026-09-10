/**
 * Mawaznety Admin API Endpoint
 *
 * Vercel Serverless Function
 * Provides admin-only access to Supabase data.
 * Verifies Firebase Auth token server-side.
 *
 * Environment variables (server-side only):
 * - SUPABASE_URL: Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Supabase service-role key (NEVER expose to client)
 * - FIREBASE_SERVICE_ACCOUNT: Firebase service account JSON string
 * - ADMIN_EMAILS: Comma-separated admin email addresses
 */

import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'yomna2008.mm@gmail.com')
  .split(',')
  .map((e) => e.trim().toLowerCase());

let firebaseAdmin = null;

async function getFirebaseAdmin() {
  if (firebaseAdmin) return firebaseAdmin;

  const { initializeApp, cert, getApps } = await import('firebase-admin/app');
  const { getAuth } = await import('firebase-admin/auth');

  if (getApps().length > 0) {
    firebaseAdmin = { initializeApp, cert, getApps, getAuth };
    return firebaseAdmin;
  }

  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccount) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT not configured');
  }

  let parsed;
  try {
    parsed = JSON.parse(serviceAccount);
  } catch {
    let inString = false;
    let escaped = false;
    let fixed = '';
    for (const ch of serviceAccount) {
      if (escaped) { fixed += ch; escaped = false; continue; }
      if (ch === '\\') { fixed += ch; escaped = true; continue; }
      if (ch === '"') { inString = !inString; fixed += ch; continue; }
      if (inString && ch === '\n') { fixed += '\\n'; continue; }
      fixed += ch;
    }
    parsed = JSON.parse(fixed);
  }

  initializeApp({ credential: cert(parsed) });
  firebaseAdmin = { initializeApp, cert, getApps, getAuth };
  return firebaseAdmin;
}

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Supabase environment variables not configured');
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function setCORSHeaders(res) {
  const origin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'same-origin';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

async function verifyFirebaseToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header');
  }

  const idToken = authHeader.split('Bearer ')[1];
  if (!idToken) {
    throw new Error('Missing ID token');
  }

  const admin = await getFirebaseAdmin();
  const decoded = await admin.getAuth().verifyIdToken(idToken);

  if (!decoded.email) {
    throw new Error('Token has no email claim');
  }

  return decoded;
}

function requireAdmin(decoded) {
  if (!decoded.email || !ADMIN_EMAILS.includes(decoded.email.toLowerCase())) {
    throw new Error('Unauthorized: admin access required');
  }
}

export default async function handler(req, res) {
  setCORSHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const decoded = await verifyFirebaseToken(req);
    const supabase = getSupabaseClient();
    const action = req.query.action || 'overview';

    switch (action) {
      case 'overview': {
        requireAdmin(decoded);

        const [
          totalEvents,
          eventsByType,
          recentEvents,
          totalVotes,
          votesByCategory,
          totalEmails,
          totalQuizScores,
          totalUsers,
        ] = await Promise.all([
          supabase.from('analytics_events').select('id', { count: 'exact', head: true }),
          supabase.from('analytics_events').select('event_name').then(({ data }) => {
            const counts = {};
            (data || []).forEach((e) => {
              counts[e.event_name] = (counts[e.event_name] || 0) + 1;
            });
            return counts;
          }),
          supabase.from('analytics_events').select('*').order('created_at', { ascending: false }).limit(50),
          supabase.from('votes').select('id', { count: 'exact', head: true }),
          supabase.from('votes').select('category_id, option_id').then(({ data }) => {
            const counts = {};
            (data || []).forEach((v) => {
              const key = `${v.category_id}:${v.option_id}`;
              counts[key] = (counts[key] || 0) + 1;
            });
            return counts;
          }),
          supabase.from('email_subscribers').select('id', { count: 'exact', head: true }),
          supabase.from('quiz_scores').select('id', { count: 'exact', head: true }),
          supabase.from('user_profiles').select('id', { count: 'exact', head: true }),
        ]);

        return res.status(200).json({
          totalEvents: totalEvents.count || 0,
          eventsByType,
          recentEvents: recentEvents.data || [],
          totalVotes: totalVotes.count || 0,
          votesByCategory,
          totalEmails: totalEmails.count || 0,
          totalQuizScores: totalQuizScores.count || 0,
          totalUsers: totalUsers.count || 0,
        });
      }

      case 'subscribers': {
        requireAdmin(decoded);

        const { data, error } = await supabase
          .from('email_subscribers')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return res.status(200).json({ subscribers: data || [] });
      }

      case 'users': {
        requireAdmin(decoded);

        const { data, error } = await supabase
          .from('user_profiles')
          .select('id, firebase_uid, email, name, provider, is_admin, created_at, last_login')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return res.status(200).json({ users: data || [] });
      }

      case 'save-settings': {
        requireAdmin(decoded);

        if (req.method !== 'POST') {
          return res.status(405).json({ error: 'Method not allowed' });
        }

        let body;
        try {
          body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        } catch {
          return res.status(400).json({ error: 'Invalid JSON body' });
        }

        const { error } = await supabase
          .from('site_settings')
          .update({
            site_name: body.siteName,
            site_description: body.siteDescription,
            allow_registration: body.allowRegistration,
            require_approval: body.requireApproval,
            email_notifications: body.emailNotifications,
            maintenance_mode: body.maintenanceMode,
            updated_at: new Date().toISOString(),
          })
          .eq('key', 'siteSettings');

        if (error) throw error;
        return res.status(200).json({ success: true });
      }

      case 'create-profile': {
        if (req.method !== 'POST') {
          return res.status(405).json({ error: 'Method not allowed' });
        }

        let body;
        try {
          body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        } catch {
          return res.status(400).json({ error: 'Invalid JSON body' });
        }

        const { uid, email, name, avatar, provider, emailVerified } = body;

        if (!uid || !email) {
          return res.status(400).json({ error: 'uid and email are required' });
        }

        const { data: existing } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('firebase_uid', uid)
          .limit(1);

        if (existing && existing.length > 0) {
          return res.status(200).json({ id: existing[0].id, exists: true });
        }

        const { data: created, error } = await supabase
          .from('user_profiles')
          .insert({
            firebase_uid: uid,
            email,
            name: name || 'User',
            avatar: avatar || null,
            provider: provider || 'unknown',
            is_admin: false,
            email_verified: emailVerified || false,
          })
          .select()
          .single();

        if (error) throw error;
        return res.status(200).json(created);
      }

      case 'update-profile': {
        if (req.method !== 'POST') {
          return res.status(405).json({ error: 'Method not allowed' });
        }

        let body;
        try {
          body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        } catch {
          return res.status(400).json({ error: 'Invalid JSON body' });
        }

        const { uid, ...updateData } = body;

        if (!uid) {
          return res.status(400).json({ error: 'uid is required' });
        }

        const { is_admin: _, ...safeData } = updateData;
        const { error } = await supabase
          .from('user_profiles')
          .update({ ...safeData, last_login: new Date().toISOString() })
          .eq('firebase_uid', uid);

        if (error) throw error;
        return res.status(200).json({ success: true });
      }

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (err) {
    console.error('[admin] Error:', err.message);
    console.error('[admin] Error stack:', err.stack);

    if (err.message.includes('Unauthorized') || err.message.includes('admin access')) {
      return res.status(403).json({ error: 'Unauthorized: admin access required' });
    }

    if (err.message.includes('Authorization') || err.message.includes('token')) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (err.message.includes('FIREBASE_SERVICE_ACCOUNT') || err.message.includes('Firebase')) {
      return res.status(500).json({ error: 'Firebase configuration error', details: err.message });
    }

    if (err.message.includes('Supabase')) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
