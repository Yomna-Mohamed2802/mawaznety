/**
 * Mawaznety Quiz API Endpoint
 *
 * Vercel Serverless Function
 * Handles quiz score submission with Firebase token verification.
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
    const parsed = typeof serviceAccount === 'string'
      ? JSON.parse(serviceAccount)
      : serviceAccount;

    if (!parsed.project_id || !parsed.private_key || !parsed.client_email) {
      throw new Error('Missing required fields');
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

    const { score, total } = body;

    if (typeof score !== 'number' || typeof total !== 'number') {
      return res.status(400).json({ error: 'score and total are required numbers' });
    }

    if (score < 0 || total <= 0 || score > total) {
      return res.status(400).json({ error: 'Invalid score/total values' });
    }

    const supabase = getSupabaseClient();

    const { data: existing } = await supabase
      .from('quiz_scores')
      .select('best_score, total_attempts, history')
      .eq('user_id', user_id)
      .single();

    if (existing) {
      const newBest = Math.max(existing.best_score || 0, score);
      const newTotal = (existing.total_attempts || 0) + 1;
      const history = existing.history || [];
      history.push({
        score,
        total,
        date: new Date().toISOString(),
      });

      const { error } = await supabase
        .from('quiz_scores')
        .update({
          best_score: newBest,
          total_attempts: newTotal,
          last_score: score,
          last_attempt: new Date().toISOString(),
          history,
        })
        .eq('user_id', user_id);

      if (error) throw error;
      return res.status(200).json({ bestScore: newBest, totalAttempts: newTotal });
    } else {
      const { error } = await supabase
        .from('quiz_scores')
        .insert({
          user_id,
          best_score: score,
          total_attempts: 1,
          last_score: score,
          last_attempt: new Date().toISOString(),
          history: [{
            score,
            total,
            date: new Date().toISOString(),
          }],
        });

      if (error) throw error;
      return res.status(200).json({ bestScore: score, totalAttempts: 1 });
    }
  } catch (err) {
    console.error('[quiz] Error:', err.message);

    if (err.message.includes('Authorization') || err.message.includes('token')) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}
