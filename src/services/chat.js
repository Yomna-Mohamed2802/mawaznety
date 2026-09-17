import { buildMessages } from '../data/budgetContext';
import { getRuleBasedResponse } from '../data/chatResponses';

const MAX_HISTORY = 20;

export async function sendToAI(userMessage, history = [], lang = 'ar') {
  const limitedHistory = history.slice(-MAX_HISTORY);
  const messages = buildMessages(userMessage, limitedHistory);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();

    if (data.fallback || !data.content) {
      return getRuleBasedResponse(userMessage, lang);
    }

    return data.content;
  } catch {
    return getRuleBasedResponse(userMessage, lang);
  }
}
