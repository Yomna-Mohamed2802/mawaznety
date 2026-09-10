/**
 * Mawaznety Vote API Endpoint
 *
 * Vercel Serverless Function
 * Handles vote submission with Firebase token verification.
 * user_id is extracted from the verified Firebase token, NOT from the request body.
 *
 * Environment variables (server-side only):
 * - SUPABASE_URL: Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Supabase service-role key (NEVER expose to client)
 * - FIREBASE_SERVICE_ACCOUNT: Firebase service account JSON string
 */

import { createClient } from '@supabase/supabase-js';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

function initFirebaseAdmin() {
  if (getApps().length > 0) return getApps()[0];

  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccount) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT not configured');
  }

  try {
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

    return initializeApp({ credential: cert(parsed) });
  } catch (e) {
    throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT: ' + e.message);
  }
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
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
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

  const app = initFirebaseAdmin();
  const decoded = await getAuth(app).verifyIdToken(idToken);
  return decoded;
}

const ALLOWED_CATEGORIES = [
  'budget_priorities', 'tax_preferences', 'spending_areas',
  'savings_priorities', 'investment_preferences',
];

export default async function handler(req, res) {
  setCORSHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const decoded = await verifyFirebaseToken(req);
    const user_id = decoded.uid;

    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }

    const { category_id, option_id } = body;

    if (!category_id || !option_id) {
      return res.status(400).json({ error: 'category_id and option_id are required' });
    }

    if (!ALLOWED_CATEGORIES.includes(category_id)) {
      return res.status(400).json({ error: 'Invalid category_id' });
    }

    if (typeof option_id !== 'string' || option_id.length > 100) {
      return res.status(400).json({ error: 'Invalid option_id' });
    }

    const supabase = getSupabaseClient();

    const { error } = await supabase
      .from('votes')
      .insert({
        category_id,
        option_id,
        user_id,
      });

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'لقد صوت بالفعل في هذا التصنيف' });
      }
      throw error;
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[vote] Error:', err.message);

    if (err.message.includes('Authorization') || err.message.includes('token')) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}
