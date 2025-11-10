import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const AIChatbot = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Ask me a question about Vidya's expertise or any topic!",
      role: 'assistant',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    backend: 'checking',
    ai: 'checking',
    lastChecked: null,
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Define API base URL - use environment variable or fallback to Vercel URL for production
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://vidyaraut.vercel.app';

  // Clear chat history on hard refresh/page reload
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('chatbotMessages');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Save messages to localStorage whenever they change (except initial welcome message)
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem('chatbotMessages', JSON.stringify(messages));
    } else {
      localStorage.removeItem('chatbotMessages');
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isWidgetOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isWidgetOpen]);

  // Check system status when chat opens
  const checkSystemStatus = useCallback(async () => {
    try {
      setSystemStatus(prev => ({
        ...prev,
        backend: 'checking',
        ai: 'checking',
      }));

      // Check backend health
      const healthResponse = await fetch(`${API_BASE_URL}/health`, {
        targetAddressSpace: 'private',
      });
      const backendStatus = healthResponse.ok ? 'online' : 'offline';

      // Check AI status by making a test request
      const testResponse = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'test', context: {} }),
      });

      let aiStatus = 'offline';
      if (testResponse.ok) {
        const data = await testResponse.json();
        aiStatus = data.success || data.answer ? 'online' : 'degraded';
      }

      setSystemStatus({
        backend: backendStatus,
        ai: aiStatus,
        lastChecked: new Date().toISOString(),
      });
    } catch {
      setSystemStatus({
        backend: 'offline',
        ai: 'offline',
        lastChecked: new Date().toISOString(),
      });
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    if (isWidgetOpen) {
      checkSystemStatus();
      // Check status every 30 seconds when chat is open
      const interval = setInterval(checkSystemStatus, 30000);
      return () => clearInterval(interval);
    }
  }, [isWidgetOpen, checkSystemStatus]);

  const portfolioContext = {
    name: 'Vidya Raut',
    location: 'Pimpri-Chinchwad, Pune-411027',
    currentStatus:
      'M.Tech in Energy Technology | Market Analyst | Energy Storage & Power Markets | Physics (MSc) | B.Ed (Science & Maths)',

    experience: [
      {
        role: 'Market Research Analyst',
        company: 'Customized Energy Solutions',
        duration: 'Jul 2023 - Jun 2024 (1 year)',
        description:
          "Analyzed energy sector data to provide strategic insights into market trends, consumer behavior, and competitor activities, helping the company make informed decisions on market share growth. Gathers data through various methods, interprets it using analytical tools, and then presents findings in reports and presentations to guide the company's strategic planning and overall business objectives.",
      },
      {
        role: 'Laboratory Intern',
        company: 'Customized Energy Solutions',
        duration: 'Jan 2023 - Jun 2023 (6 months)',
        description:
          'Here, I assist engineers with battery research and development, characterizing materials, assembling batteries, analyzing data, and maintaining lab equipment and records. I strictly follow all laboratory safety protocols, including proper handling, storage, and disposal of hazardous chemicals and materials, consistent use of Personal Protective Equipment (PPE), and keeping a clean and organized workspace to reduce risks.',
      },
      {
        role: 'Teaching Professional',
        company: 'S.S.V.M. & Jr. College',
        duration: 'May 2021 - Oct 2021 (6 months)',
        description:
          'This involves assisting lead teachers with lesson preparation and delivery, supporting students through one-on-one or small group interactions, managing classroom routines and behavior, maintaining records, and participating in professional development, all while gaining hands-on experience under supervision. Key qualifications include enrollment in an education degree program, strong communication skills, and a passion for working with students.',
      },
      {
        role: 'Data Analyst',
        company: 'Customized Energy Solutions',
        duration: 'Nov 2017 - Apr 2018 (6 months)',
        description: [
          'Develop and maintain interactive dashboards and reports using Microsoft Excel.',
          'Present findings and recommendations to managers to support data-driven decision-making.',
          'Collaborate with cross-functional teams to understand business challenges and develop data-driven solutions.',
        ],
      },
    ],

    skills: {
      technical: [
        'Laboratory Safety',
        'Battery Management Systems',
        'Quantitative Research',
        'Microsoft Excel (Advanced)',
        'PowerPoint',
        'Data Analysis',
        'Energy Audits',
        'Solar System Design',
      ],
      research: [
        'Market Research',
        'Project Management',
        'Report Writing',
        'Competitive Intelligence',
      ],
      professional: [
        'Critical Thinking',
        'Communication',
        'Teamwork',
        'Problem Solving',
        'Analytical Skills',
        'Presentation Skills',
      ],
    },

    education: [
      'Master of Technology - MTech, Energy Technology · Savitribai Phule Pune University (July 2025 - May 2027)',
      'Bachelor of Education - BEd, Science and mathematics · Shri Shivaji Maratha Societys Adhyapak Mahavidyalaya (Sep 2020 - Apr 2022)',
      'Master of Science - MS, Physics · The Poona Gujrati Kelwani Mandals H.V.Desai Senior College (Jun 2018 - Apr 2020)',
      "Bachelor's degree, Physics · Progressive Education Societys Modern College (Aug 2014 - Oct 2017)",
    ],

    projects: [
      'Synthesis & Characterization of Fe3O4 Thin Films (2019-2020)',
      'Formation of Core Losses of Different Magnetic Materials (2016-2017)',
    ],

    certifications: [
      'International Conference: MHMEE-2020',
      'NCC Cadet (CATC participation)',
      'MS-CIT',
    ],

    expertise: [
      'Energy storage markets',
      'Battery R&D',
      'Solar PV',
      'Market sizing',
      'Competitive intelligence',
      'Policy/tariff tracking',
      'Hydrogen fuel',
    ],

    availability:
      'Looking for: Market/Energy Analyst roles where I can improve reporting speed/quality and support data-driven strategy.',

    contact: {
      email: 'vidyaraut17297@gmail.com',
      phone: '+91 8446495690',
      linkedin: 'www.linkedin.com/in/vidyaraut17',
      github: 'github.com/vidyaraut17297',
      portfolio: 'vidyaraut17297.github.io/vidyaraut',
    },
  };

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      content: inputValue,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Call backend API to get AI response with proper JSON formatting
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue.trim(),
          context: portfolioContext,
        }),
        targetAddressSpace: 'public',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (response.ok && (data.success || data.answer)) {
        // Success response with enhanced metadata
        const botMessage = {
          id: Date.now() + 1,
          content:
            data.response ||
            data.answer ||
            "I'm having trouble responding right now.",
          role: 'assistant',
          timestamp: new Date().toISOString(),
          metadata: {
            // Core metadata
            source: data.metadata?.source || '🤖 OpenRouter AI (Live)',
            category: data.metadata?.category || 'general',
            confidence: data.metadata?.confidence || '0.95',
            responseTime: data.metadata?.responseTime || '500ms',
            quality: data.metadata?.quality || 'high',

            // AI-specific metadata
            ai_model_used:
              data.metadata?.ai_model_used || 'minimax/minimax-m2:free',
            tokens_used: data.metadata?.total_tokens || '100',
            processingSpeed: data.metadata?.processingSpeed || 'fast',

            // Status indicators
            isOnline: data.metadata?.isOnline !== false,
            cached: data.metadata?.cached || false,
            fallbackUsed: data.metadata?.fallbackUsed || false,

            // Legacy support
            model:
              data.model ||
              data.metadata?.ai_model_used ||
              'minimax/minimax-m2:free',
            runtime: data.metadata?.responseTime || '500ms',
          },
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Error response - show user-friendly error message
        let errorMessage =
          "I'm having trouble connecting right now. Please check the contact section to reach out to Vidya directly!";

        if (data.message) {
          if (
            data.message.includes('rate limit') ||
            data.message.includes('busy') ||
            data.message.includes('demand') ||
            data.message.includes('try again')
          ) {
            errorMessage =
              'The AI assistant is currently busy due to high demand. Please try again in a few minutes!';
          } else {
            errorMessage = data.message;
          }
        }

        const botMessage = {
          id: Date.now() + 1,
          content: errorMessage,
          role: 'assistant',
          timestamp: new Date().toISOString(),
          error: true,
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback response
      const fallbackMessage = {
        id: Date.now() + 1,
        content:
          "I'm having trouble connecting right now. Please check the contact section to reach out to Vidya directly!",
        role: 'assistant',
        timestamp: new Date().toISOString(),
        error: true,
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="chat-toggle-btn"
        onClick={() => setIsWidgetOpen(!isWidgetOpen)}
        aria-label="Open chat"
        title="Chat with AI Assistant"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0071e3 0%, #005bb5 100%)',
          border: 'none',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: '9999',
          boxShadow: '0 4px 20px rgba(0, 113, 227, 0.4)',
          transition: 'all 0.3s ease',
          animation: 'pulse 2s infinite',
        }}
        onMouseEnter={e => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 25px rgba(0, 113, 227, 0.5)';
        }}
        onMouseLeave={e => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 20px rgba(0, 113, 227, 0.4)';
        }}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isWidgetOpen && (
        <div
          className="chat-window"
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            width: '400px',
            height: '600px',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            zIndex: '9999',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 0.3s ease',
            border: '1px solid var(--color-border)',
          }}
        >
          {/* Header */}
          <div
            className="chat-header"
            style={{
              height: '60px',
              background: 'linear-gradient(135deg, #0071e3 0%, #005bb5 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px',
              borderRadius: '20px 20px 0 0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bot size={16} />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600' }}>
                  Vidya's AI Assistant
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    opacity: 0.8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {/* Backend Status */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background:
                          systemStatus.backend === 'online'
                            ? '#10b981'
                            : systemStatus.backend === 'offline'
                              ? '#ef4444'
                              : '#f59e0b',
                      }}
                    ></div>
                    <span>Backend</span>
                  </div>

                  {/* AI Status */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background:
                          systemStatus.ai === 'online'
                            ? '#10b981'
                            : systemStatus.ai === 'degraded'
                              ? '#f59e0b'
                              : '#ef4444',
                      }}
                    ></div>
                    <span>AI</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setIsWidgetOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e =>
                  (e.target.style.background = 'rgba(255, 255, 255, 0.1)')
                }
                onMouseLeave={e => (e.target.style.background = 'none')}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            className="chat-messages"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              background: '#f8f9fa',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map(message => (
              <div
                key={message.id}
                className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
                style={{
                  alignSelf:
                    message.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {/* Main message bubble */}
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius:
                      message.role === 'user'
                        ? '18px 18px 4px 18px'
                        : '18px 18px 18px 4px',
                    background:
                      message.role === 'user'
                        ? 'linear-gradient(135deg, #0071e3 0%, #005bb5 100%)'
                        : '#f5f5f7',
                    color: message.role === 'user' ? 'white' : '#1d1d1f',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    boxShadow:
                      message.role === 'user'
                        ? '0 2px 8px rgba(0,113,227,0.2)'
                        : '0 2px 8px rgba(0,0,0,0.08)',
                    wordWrap: 'break-word',
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: message.content }} />
                </div>

                {/* Metadata indicators for bot messages */}
                {message.role === 'assistant' && message.metadata && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      alignSelf: 'flex-start',
                      maxWidth: '100%',
                    }}
                  >
                    {/* Response Source Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '500',
                        background: message.metadata.source?.includes('🤖')
                          ? '#10b981'
                          : message.metadata.source?.includes('📋')
                            ? '#f59e0b'
                            : '#ef4444',
                        color: 'white',
                      }}
                    >
                      <span>
                        {message.metadata.source?.split(' ')[0] || '🤖'}
                      </span>
                      <span>AI</span>
                    </div>

                    {/* Model Badge */}
                    {message.metadata.ai_model_used && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '500',
                          background: '#6366f1',
                          color: 'white',
                        }}
                      >
                        <span>🧠</span>
                        <span>
                          {message.metadata.ai_model_used.split('/').pop()}
                        </span>
                      </div>
                    )}

                    {/* Response Time Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '500',
                        background:
                          message.metadata.processingSpeed === 'fast'
                            ? '#10b981'
                            : message.metadata.processingSpeed === 'normal'
                              ? '#f59e0b'
                              : '#ef4444',
                        color: 'white',
                      }}
                    >
                      <span>⚡</span>
                      <span>{message.metadata.responseTime}</span>
                    </div>

                    {/* Quality Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '500',
                        background:
                          message.metadata.quality === 'high'
                            ? '#10b981'
                            : message.metadata.quality === 'medium'
                              ? '#f59e0b'
                              : '#6b7280',
                        color: 'white',
                      }}
                    >
                      <span>⭐</span>
                      <span>{message.metadata.quality}</span>
                    </div>

                    {/* Tokens Used Badge */}
                    {message.metadata.tokens_used && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '500',
                          background: '#8b5cf6',
                          color: 'white',
                        }}
                      >
                        <span>🔢</span>
                        <span>{message.metadata.tokens_used}</span>
                      </div>
                    )}

                    {/* Status Indicators */}
                    {message.metadata.cached && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '500',
                          background: '#06b6d4',
                          color: 'white',
                        }}
                      >
                        <span>💾</span>
                        <span>Cached</span>
                      </div>
                    )}

                    {message.metadata.fallbackUsed && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '500',
                          background: '#f59e0b',
                          color: 'white',
                        }}
                      >
                        <span>🔄</span>
                        <span>Fallback</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div
                className="typing-indicator"
                style={{
                  alignSelf: 'flex-start',
                  display: 'flex',
                  gap: '4px',
                  padding: '12px 16px',
                  background: '#f5f5f7',
                  borderRadius: '18px 18px 18px 4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#86868b',
                    animation: 'typing 1.4s infinite',
                  }}
                ></div>
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#86868b',
                    animation: 'typing 1.4s infinite',
                    animationDelay: '0.2s',
                  }}
                ></div>
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#86868b',
                    animation: 'typing 1.4s infinite',
                    animationDelay: '0.4s',
                  }}
                ></div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            className="chat-input"
            style={{
              height: '80px',
              padding: '20px',
              background: 'white',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me a question..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '24px',
                border: '1px solid var(--color-border)',
                outline: 'none',
                fontSize: '14px',
                background: '#f8f9fa',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor = '#0071e3')}
              onBlur={e => (e.target.style.borderColor = '#d1d1d6')}
            />
            <button
              onClick={handleSend}
              disabled={inputValue.trim() === ''}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background:
                  inputValue.trim() === ''
                    ? '#d1d1d6'
                    : 'linear-gradient(135deg, #0071e3 0%, #005bb5 100%)',
                color: 'white',
                cursor: inputValue.trim() === '' ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

AIChatbot.propTypes = {
  // No props needed
};

export default AIChatbot;
