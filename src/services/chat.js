import { buildMessages } from '../data/budgetContext';

export async function sendToAI(userMessage, history = []) {
  const messages = buildMessages(userMessage, history);

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content;
}
