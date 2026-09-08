/**
 * OpenRouter AI Chat Endpoint
 *
 * Serverless API route that proxies chat requests to OpenRouter's
 * OpenAI-compatible API. Defaults to the free model router.
 *
 * Environment variables:
 * - OPENROUTER_API_KEY: OpenRouter API key (server-side only)
 * - AI_MODEL: Model ID override (default: openrouter/free)
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  const AI_MODEL = process.env.AI_MODEL || 'openrouter/free';

  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({ error: 'OPENROUTER_API_KEY not configured' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array required' });
    }

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
        messages,
        max_tokens: 2048,
        temperature: 0.7,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: errorData.error?.message || `OpenRouter API error: ${response.status}`,
      });
    }

    const data = await response.json();

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ error: 'No response from AI model' });
    }

    return res.status(200).json({ content });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
