/**
 * Gemini API Serverless Function (Vercel)
 *
 * Proxies requests to Google Gemini API.
 * API key stays server-side — NEVER exposed to the browser.
 *
 * Security:
 * - Server-side API key (process.env.GEMINI_API_KEY)
 * - Input validation and length limits
 * - POST-only
 * - No credential logging
 */

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 20;
const GEMINI_TIMEOUT = 30000;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  // Validate and sanitize messages
  const sanitizedMessages = [];
  for (const msg of messages.slice(-MAX_HISTORY_MESSAGES)) {
    if (!msg.role || !msg.content || typeof msg.content !== 'string') continue;
    if (msg.content.length > MAX_MESSAGE_LENGTH) {
      sanitizedMessages.push({ ...msg, content: msg.content.slice(0, MAX_MESSAGE_LENGTH) });
    } else {
      sanitizedMessages.push(msg);
    }
  }

  if (sanitizedMessages.length === 0) {
    return res.status(400).json({ error: 'No valid messages' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY not configured');
    return res.status(500).json({ error: 'AI service not configured' });
  }

  const MODEL = 'gemini-2.0-flash';
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  const contents = sanitizedMessages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GEMINI_TIMEOUT);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status);
      return res.status(502).json({ error: 'AI service temporarily unavailable' });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(502).json({ error: 'Empty response from AI' });
    }

    return res.status(200).json({ text });
  } catch (error) {
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: 'AI request timed out' });
    }
    console.error('Gemini proxy error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
