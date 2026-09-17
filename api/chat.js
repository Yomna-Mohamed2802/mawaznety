/**
 * Mawaznety AI Chat Endpoint
 *
 * Vercel Serverless Function
 * Proxies chat requests to OpenRouter.
 *
 * Environment variables (server-side only):
 * - OPENROUTER_API_KEY: OpenRouter API key
 * - AI_MODEL: Model ID (default: openrouter/free)
 */

const MAX_MESSAGES = 20;
const REQUEST_TIMEOUT_MS = 30000;
const MAX_BODY_BYTES = 100000;

const ALLOWED_ORIGIN = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : null;

function setCORSHeaders(res) {
  const origin = ALLOWED_ORIGIN || 'same-origin';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function setNoCacheHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
}

export default async function handler(req, res) {
  setCORSHeaders(res);
  setNoCacheHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Request body too large' });
  }

  let body;
  try {
    if (typeof req.body === 'string') {
      body = JSON.parse(req.body);
    } else {
      body = req.body;
    }
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const { messages } = body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const trimmedMessages = messages.slice(-MAX_MESSAGES);

  if (trimmedMessages.length === 0) {
    return res.status(400).json({ error: 'messages array is empty' });
  }

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  const AI_MODEL = process.env.AI_MODEL || 'openrouter/free';

  if (!OPENROUTER_API_KEY) {
    console.error('[chat] OPENROUTER_API_KEY not configured');
    return res.status(500).json({ error: 'AI not configured', fallback: true });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://mawaznety.vercel.app',
        'X-Title': 'Mawaznety',
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: trimmedMessages,
        max_tokens: 2048,
        temperature: 0.7,
        top_p: 0.9,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[chat] OpenRouter error: ${response.status}`);
      return res.status(500).json({ error: 'AI temporarily unavailable', fallback: true });
    }

    const data = await response.json();

    if (!data || typeof data !== 'object') {
      console.error('[chat] Malformed response from OpenRouter');
      return res.status(500).json({ error: 'Invalid AI response', fallback: true });
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content || typeof content !== 'string') {
      console.error('[chat] No content in OpenRouter response');
      return res.status(500).json({ error: 'Empty AI response', fallback: true });
    }

    return res.status(200).json({ content });
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('[chat] OpenRouter request timed out');
      return res.status(504).json({ error: 'AI timed out', fallback: true });
    }

    console.error('[chat] OpenRouter request failed:', err.message);
    return res.status(500).json({ error: 'AI request failed', fallback: true });
  }
}
