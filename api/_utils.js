/**
 * Shared utilities for Vercel API endpoints
 */

import { createClient } from '@supabase/supabase-js';

let firebaseAdmin = null;

export async function getFirebaseAdmin() {
  if (firebaseAdmin) return firebaseAdmin;

  const { initializeApp, cert, getApps } = await import('firebase-admin/app');
  const { getAuth } = await import('firebase-admin/auth');

  if (getApps().length > 0) {
    firebaseAdmin = { getAuth };
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
    parsed = parseServiceAccount(serviceAccount);
  }

  initializeApp({ credential: cert(parsed) });
  firebaseAdmin = { getAuth };
  return firebaseAdmin;
}

function parseServiceAccount(raw) {
  let result = '';
  let inString = false;
  let escaped = false;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];

    if (escaped) {
      result += ch;
      escaped = false;
      continue;
    }

    if (ch === '\\') {
      result += ch;
      escaped = true;
      continue;
    }

    if (ch === '"') {
      inString = !inString;
      result += ch;
      continue;
    }

    if (inString) {
      if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && i + 1 < raw.length && raw[i + 1] === '\n') {
          result += '\\n';
          i++;
        } else {
          result += '\\n';
        }
        continue;
      }
      if (ch === '\t') {
        result += '\\t';
        continue;
      }
    }

    result += ch;
  }

  return JSON.parse(result);
}

export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Supabase environment variables not configured');
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function setCORSHeaders(res) {
  const origin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.VERCEL_BRANCH_URL
      ? `https://${process.env.VERCEL_BRANCH_URL}`
      : '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

export async function verifyFirebaseToken(req) {
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

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || 'yomna2008.mm@gmail.com')
    .split(',')
    .map((e) => e.trim().toLowerCase());
}

export function requireAdmin(decoded) {
  const emails = getAdminEmails();
  if (!decoded.email || !emails.includes(decoded.email.toLowerCase())) {
    throw new Error('Unauthorized: admin access required');
  }
}
