/**
 * Mawaznety Vote API Endpoint
 *
 * Vercel Serverless Function
 * Handles vote submission with Firebase token verification.
 * user_id is extracted from the verified Firebase token, NOT from the request body.
 */

import {
  getSupabaseClient,
  setCORSHeaders,
  verifyFirebaseToken,
} from './_utils.js';

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
    console.error('[vote] Stack:', err.stack);

    if (err.message.includes('Authorization') || err.message.includes('ID token') || err.message.includes('token')) {
      return res.status(401).json({ error: 'Authentication required', details: err.message });
    }

    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
