import { buildMessages } from '../data/budgetContext';
import { getRuleBasedResponse } from '../data/chatResponses';

export async function sendToAI(userMessage, history = [], lang = 'ar') {
  try {
    const messages = buildMessages(userMessage, history);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content;
  } catch {
    return getRuleBasedResponse(userMessage, lang);
  }
}