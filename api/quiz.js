/**
 * Mawaznety Quiz API Endpoint
 *
 * Vercel Serverless Function
 * Handles quiz score submission with Firebase token verification.
 * user_id is extracted from the verified Firebase token, NOT from the request body.
 * Score is calculated SERVER-SIDE from submitted answers — never trusted from client.
 */

import {
  getSupabaseClient,
  setCORSHeaders,
  verifyFirebaseToken,
} from './_utils.js';

// Authoritative quiz answers — same as src/data/quiz.js
// Server calculates score; client cannot forge it.
const QUIZ_ANSWERS = {
  q1: 2,
  q2: 2,
  q3: 1,
  q4: 3,
  q5: 1,
  q6: 1,
  q7: 0,
  q8: 2,
};

const TOTAL_QUESTIONS = Object.keys(QUIZ_ANSWERS).length;

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

    const { answers } = body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'answers array is required' });
    }

    if (answers.length !== TOTAL_QUESTIONS) {
      return res.status(400).json({ error: `Expected ${TOTAL_QUESTIONS} answers, got ${answers.length}` });
    }

    // Validate and score server-side
    let score = 0;
    for (const entry of answers) {
      if (!entry.questionId || typeof entry.answer !== 'number') {
        return res.status(400).json({ error: 'Each answer must have questionId and answer (number)' });
      }

      const correctAnswer = QUIZ_ANSWERS[entry.questionId];
      if (correctAnswer === undefined) {
        return res.status(400).json({ error: `Unknown question: ${entry.questionId}` });
      }

      if (entry.answer < 0 || entry.answer > 3) {
        return res.status(400).json({ error: `Invalid answer index for ${entry.questionId}` });
      }

      if (entry.answer === correctAnswer) {
        score++;
      }
    }

    const supabase = getSupabaseClient();

    const { data: existing } = await supabase
      .from('quiz_scores')
      .select('best_score, total_attempts, history')
      .eq('user_id', user_id)
      .maybeSingle();

    if (existing) {
      const newBest = Math.max(existing.best_score || 0, score);
      const newTotal = (existing.total_attempts || 0) + 1;
      const history = existing.history || [];
      history.push({
        score,
        total: TOTAL_QUESTIONS,
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
      return res.status(200).json({ bestScore: newBest, totalAttempts: newTotal, score, total: TOTAL_QUESTIONS });
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
            total: TOTAL_QUESTIONS,
            date: new Date().toISOString(),
          }],
        });

      if (error) throw error;
      return res.status(200).json({ bestScore: score, totalAttempts: 1, score, total: TOTAL_QUESTIONS });
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
