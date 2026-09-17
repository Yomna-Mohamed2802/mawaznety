import { getRuleBasedResponse } from '../data/chatResponses';

export async function sendToAI(userMessage, history = [], lang = 'ar') {
  return getRuleBasedResponse(userMessage, lang);
}
