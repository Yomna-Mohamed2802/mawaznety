import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChatBubbleLeftRight, HiXMark, HiPaperAirplane } from 'react-icons/hi2';
import { getChatResponse, suggestedQuestions } from '../../data/chatResponses';
import { sendToGemini } from '../../services/gemini';

const BOT_AVATAR = (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center flex-shrink-0">
    <span className="text-xs font-bold text-white">م</span>
  </div>
);

const USER_AVATAR = (
  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
    <span className="text-xs font-bold text-primary-700">أ</span>
  </div>
);

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-primary-300"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }) {
  const isBot = msg.sender === 'bot';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {isBot && BOT_AVATAR}
      <div
        className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
          isBot
            ? 'bg-primary-50 text-primary-800 rounded-2xl rounded-tr-md border border-primary-100/60'
            : 'bg-primary-700 text-white rounded-2xl rounded-tl-md'
        }`}
      >
        {msg.text}
      </div>
      {!isBot && USER_AVATAR}
    </motion.div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'اهلا بيك في موازنتي! اسألني أي سؤال عن موازنة المواطن 2026/2027.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async (text) => {
    const query = text || input.trim();
    if (!query) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Try Gemini AI first
      const history = messages.slice(1).map((m) => ({ sender: m.sender, text: m.text }));
      const reply = await sendToGemini(query, history);
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      // Fallback to local keyword matching
      console.warn('Gemini failed, using local fallback:', err.message);
      const fallback = getChatResponse(query);
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: fallback.reply };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
      if (!isOpen) setHasNewMessage(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ─── Chat Window ──────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-20 left-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] sm:left-6"
            dir="rtl"
          >
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col" style={{ height: '520px', boxShadow: '0 20px 60px -15px rgb(16 42 67 / 0.25)' }}>
              {/* Header */}
              <div className="bg-gradient-to-l from-primary-700 to-primary-900 px-4 py-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">م</span>
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-bold">اسأل موازنتي</h3>
                    <p className="text-white/70 text-[11px]">مساعد تعليمي — بيانات من موازنة المواطن</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="إغلاق المحادثة"
                >
                  <HiXMark className="w-5 h-5 text-white/80" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 overscroll-contain">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    {BOT_AVATAR}
                    <div className="bg-primary-50 rounded-2xl rounded-tr-md border border-primary-100/60">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions (shown only at start) */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-[11px] px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full border border-primary-100/60 hover:bg-primary-100 transition-colors text-right"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-3 pb-3 pt-1 flex-shrink-0">
                <div className="flex items-center gap-2 bg-primary-50/80 rounded-xl px-3 py-2 border border-primary-100/60 focus-within:border-primary-300 focus-within:bg-white transition-all">
                  <label htmlFor="chat-input" className="sr-only">اكتب سؤالك هنا</label>
                  <input
                    ref={inputRef}
                    id="chat-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="اكتب سؤالك هنا..."
                    className="flex-1 bg-transparent text-sm text-primary-900 placeholder-primary-400 outline-none"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="w-8 h-8 rounded-lg bg-primary-700 hover:bg-primary-800 disabled:bg-primary-300 flex items-center justify-center transition-colors flex-shrink-0"
                    aria-label="إرسال"
                  >
                    <HiPaperAirplane className="w-4 h-4 text-white -rotate-90" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Bubble ──────────────────────────── */}
      <motion.button
        data-chatbot-bubble
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary-700 to-primary-900 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{ boxShadow: '0 8px 30px -8px rgb(16 42 67 / 0.4)' }}
        aria-label={isOpen ? 'إغلاق المحادثة' : 'فتح المحادثة'}
        aria-expanded={isOpen}
        aria-controls="chat-window"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <HiXMark className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <HiOutlineChatBubbleLeftRight className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* New message indicator */}
        <AnimatePresence>
          {hasNewMessage && !isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
