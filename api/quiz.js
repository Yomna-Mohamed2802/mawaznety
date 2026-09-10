/**
 * Mawaznety Quiz API Endpoint
 *
 * Vercel Serverless Function
 * Handles quiz score submission with Firebase token verification.
 * user_id is extracted from the verified Firebase token, NOT from the request body.
 */

import {
  getSupabaseClient,
  setCORSHeaders,
  verifyFirebaseToken,
} from './_utils.js';

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
    console.error('[quiz] Stack:', err.stack);

    if (err.message.includes('Authorization') || err.message.includes('ID token') || err.message.includes('token')) {
      return res.status(401).json({ error: 'Authentication required', details: err.message });
    }

    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
