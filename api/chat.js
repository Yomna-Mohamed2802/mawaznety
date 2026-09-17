/**
 * Mawaznety AI Chat Endpoint
 * Uses Google Gemini API
 *
 * Environment variables (server-side only):
 * - GEMINI_API_KEY: Google AI Studio API key
 */

const MAX_MESSAGES = 20;
const REQUEST_TIMEOUT_MS = 20000;
const MAX_BODY_BYTES = 100000;

function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function setNoCacheHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
}

export default async function handler(req, res) {
  setCORSHeaders(res);
  setNoCacheHeaders(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > MAX_BODY_BYTES) return res.status(413).json({ error: 'Request body too large' });

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const { messages } = body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error('[chat] GEMINI_API_KEY not set');
    return res.status(500).json({ error: 'AI not configured', fallback: true });
  }

  const trimmed = messages.slice(-MAX_MESSAGES);

  const systemMsg = trimmed.find(m => m.role === 'system');
  const chatMsgs = trimmed.filter(m => m.role !== 'system');

  const contents = chatMsgs.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  let bodyPayload;
  if (systemMsg) {
    bodyPayload = {
      system_instruction: { parts: [{ text: systemMsg.content }] },
      contents,
    };
  } else {
    bodyPayload = { contents };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[chat] Gemini error: ${response.status}`);
      return res.status(500).json({ error: 'AI error', fallback: true });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('[chat] Empty Gemini response');
      return res.status(500).json({ error: 'Empty AI response', fallback: true });
    }

    return res.status(200).json({ content: text });
  } catch (err) {
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'AI timed out', fallback: true });
    }
    console.error('[chat] Gemini request failed:', err.message);
    return res.status(500).json({ error: 'AI request failed', fallback: true });
  }
}
