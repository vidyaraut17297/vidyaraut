import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Minimize2, ExternalLink } from 'lucide-react';
import { sendChatMessage, generateFallbackResponse } from '../../utils/chatbot';
import './Chatbot.module.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! 👋 I'm Vidya's AI assistant. I can answer questions about her experience, skills, and projects. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Quick actions
  const quickActions = [
    { icon: '📊', text: 'View Skills', action: 'skills' },
    { icon: '💼', text: 'Experience', action: 'experience' },
    { icon: '📚', text: 'Education', action: 'education' },
    { icon: '🚀', text: 'Projects', action: 'projects' },
    { icon: '📧', text: 'Contact Info', action: 'contact' },
    { icon: '📄', text: 'Download Resume', action: 'resume' },
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending messages
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await sendChatMessage(input, messages);

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: result.message,
        },
      ]);
    } catch {
      // Fallback to generated response if API fails
      const fallbackResponse = generateFallbackResponse(input);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: fallbackResponse,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = action => {
    const prompts = {
      skills: "What are Vidya's technical skills?",
      experience: 'Tell me about her work experience',
      education: "What's her educational background?",
      projects: 'What projects has she worked on?',
      contact: 'How can I contact Vidya?',
      resume: 'Where can I download her resume?',
    };

    const promptText = prompts[action];
    setInput(promptText);

    // Automatically send the quick action message
    setTimeout(() => {
      const userMessage = { role: 'user', content: promptText };
      setMessages(prev => [...prev, userMessage]);

      // Trigger the send functionality
      sendQuickActionMessage(promptText);
    }, 100);
  };

  // Separate function to handle quick action message sending
  const sendQuickActionMessage = async message => {
    setIsLoading(true);

    try {
      const result = await sendChatMessage(message, messages);

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: result.message,
        },
      ]);
    } catch {
      // Fallback to generated response if API fails
      const fallbackResponse = generateFallbackResponse(message);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: fallbackResponse,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chatbot-floating-button"
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
          <span className="chatbot-badge">AI</span>
          <div className="chatbot-pulse-animation"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`chatbot-window ${isMinimized ? 'minimized' : ''}`}>
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">VR</div>
              <div>
                <h4>Vidya's AI Assistant</h4>
                <span className="chatbot-status">
                  <span className="chatbot-status-dot"></span>
                  Online
                </span>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="chatbot-action-button"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
              >
                <Minimize2 size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="chatbot-action-button"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="chatbot-messages">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`chatbot-message ${msg.role}`}>
                    {msg.content.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < msg.content.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                ))}
                {isLoading && (
                  <div className="chatbot-message assistant">
                    <div className="chatbot-typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions - Show only on first message */}
              {messages.length === 1 && (
                <div className="chatbot-quick-actions">
                  {quickActions.map(action => (
                    <button
                      key={action.action}
                      onClick={() => handleQuickAction(action.action)}
                      className="chatbot-quick-button"
                    >
                      <span>{action.icon}</span>
                      <span>{action.text}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Input Area */}
              <div className="chatbot-input-area">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Vidya..."
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
