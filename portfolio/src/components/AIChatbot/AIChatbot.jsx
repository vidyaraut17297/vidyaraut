import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const AIChatbot = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    // Load messages from localStorage if available
    const savedMessages = localStorage.getItem('chatbotMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Only return saved messages if they exist and are valid
        if (
          parsedMessages &&
          Array.isArray(parsedMessages) &&
          parsedMessages.length > 0
        ) {
          return parsedMessages;
        }
      } catch (e) {
        console.error('Error parsing saved messages:', e);
      }
    }
    // Return initial welcome message if no saved messages or parsing failed
    return [
      {
        id: 1,
        content: "Ask me a question about Vidya's expertise or any topic!",
        role: 'assistant',
        timestamp: new Date().toISOString(),
      },
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [retryMessageId, setRetryMessageId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Define API base URL - use environment variable or fallback to localhost for development
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatbotMessages', JSON.stringify(messages));
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

  const portfolioContext = {
    name: 'Vidya Raut',
    location: 'Pune, Maharashtra, India',
    currentStatus: 'Pursuing M.Tech in Energy Technology (2025-2027)',

    experience: [
      {
        role: 'Market Research Analyst',
        company: 'Customized Energy Solutions',
        duration: 'Jul 2023 - Jun 2024 (1 year)',
        description:
          'Analyzed energy sector data, market trends, consumer behavior. Created strategic insights and decision-ready dashboards.',
      },
      {
        role: 'Laboratory Intern',
        company: 'Customized Energy Solutions',
        duration: 'Jan 2023 - Jun 2023 (6 months)',
        description:
          'Assisted with battery R&D, material characterization, battery assembly, data analysis.',
      },
      {
        role: 'Data Analyst',
        company: 'Customized Energy Solutions',
        duration: 'Nov 2017 - Apr 2018 (6 months)',
        description:
          'Developed interactive dashboards using Excel. Presented findings to management.',
      },
      {
        role: 'Teaching Professional',
        company: 'S.S.V.M. & Jr. College',
        duration: 'May 2021 - Oct 2021 (6 months)',
        description:
          'Assisted with lesson preparation and delivery for Science and Mathematics.',
      },
    ],

    skills: {
      technical: [
        'Excel (Advanced)',
        'PowerPoint',
        'Data Analysis',
        'Battery Management Systems',
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
      'M.Tech in Energy Technology - Savitribai Phule Pune University (2025-2027)',
      'B.Ed Science & Mathematics - Shri Shivaji Maratha Society (2020-2022)',
      'M.Sc Physics - H.V.Desai College (2018-2020)',
      'B.Sc Physics - PES Modern College (2014-2017)',
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
    ],

    availability:
      'Open to Market/Energy Analyst roles. Available for full-time positions.',

    contact: {
      email: 'vidyaraut17297@gmail.com',
      phone: '+91 8446495690',
      linkedin: 'linkedin.com/in/vidyaraut17/',
      github: 'github.com/vidyaraut17297',
    },
  };

  const copyToClipboard = async text => {
    try {
      await navigator.clipboard.writeText(text);
      // Optionally show a notification that the text was copied
      console.log('Message copied to clipboard');
    } catch (err) {
      console.error('Failed to copy message: ', err);
    }
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
      // Call backend API to get AI response
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          context: portfolioContext,
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success || data.answer)) {
        // Success response - using the format from mangeshrautarchive
        const botMessage = {
          id: Date.now() + 1,
          content:
            data.response ||
            data.answer ||
            "I'm having trouble responding right now.",
          role: 'assistant',
          timestamp: new Date().toISOString(),
          metadata: data.metadata || {
            source: data.source || 'OpenRouter',
            model: data.model || 'Gemini 2.0 Flash',
            category: data.category || 'Portfolio',
            confidence: data.confidence || 0.9,
            runtime: data.runtime || '450ms',
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

  const retryMessage = async messageId => {
    const messageToRetry = messages.find(
      msg => msg.id === messageId && msg.role === 'user'
    );
    if (!messageToRetry) return;

    setRetryMessageId(messageId);
    setMessages(prev =>
      prev.map(msg => (msg.id === messageId ? { ...msg, retrying: true } : msg))
    );

    try {
      // Add a delay before retrying to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToRetry.content,
          context: portfolioContext,
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success || data.answer)) {
        const botMessage = {
          id: Date.now() + 1,
          content:
            data.response ||
            data.answer ||
            "I'm having trouble responding right now.",
          role: 'assistant',
          timestamp: new Date().toISOString(),
          metadata: data.metadata || {
            source: data.source || 'OpenRouter',
            model: data.model || 'Gemini 2.0 Flash',
            category: data.category || 'Portfolio',
            confidence: data.confidence || 0.9,
            runtime: data.runtime || '450ms',
          },
        };
        // Remove the error message and replace with new response
        setMessages(prev =>
          prev
            .filter(
              msg =>
                !(
                  msg.role === 'assistant' &&
                  msg.error &&
                  msg.timestamp === messageToRetry.timestamp
                )
            )
            .concat(botMessage)
        );
      } else {
        let errorMessage =
          "I'm still having trouble connecting right now. The AI service may be experiencing high demand. Try again in a minute!";

        if (data.message) {
          if (
            data.message.includes('rate limit') ||
            data.message.includes('busy') ||
            data.message.includes('demand') ||
            data.message.includes('try again')
          ) {
            errorMessage =
              'The AI assistant is still busy due to high demand. Please try again in a minute or ask a different question!';
          } else if (
            data.message.includes('Unauthorized') ||
            data.message.includes('API')
          ) {
            errorMessage =
              'There seems to be an issue with the AI service configuration. Please try again later.';
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
      console.error('Error retrying message:', error);
      const fallbackMessage = {
        id: Date.now() + 1,
        content:
          "I'm still having trouble connecting right now. The server may be temporarily unavailable.",
        role: 'assistant',
        timestamp: new Date().toISOString(),
        error: true,
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setRetryMessageId(null);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, retrying: false } : msg
        )
      );
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        id="chatbot-toggle"
        style={{
          position: 'fixed',
          bottom: 'calc(60px + 2rem + 1rem)', /* Moved up even more */
          right: '60px', /* Moved left from theme toggle */
          zIndex: '9996',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #007AFF 0%, #0051D5 100%)',
          border: 'none',
          boxShadow:
            '0 4px 16px rgba(0, 122, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)',
          color: 'white',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
        onClick={() => setIsWidgetOpen(!isWidgetOpen)}
        aria-label={isWidgetOpen ? 'Close AI Chatbot' : 'Open AI Chatbot'}
        title={isWidgetOpen ? 'Close Chat' : 'Open Chat'}
      >
        💭
      </button>

      {/* Chatbot Widget */}
      {isWidgetOpen && (
        <div
          id="chatbot-widget"
          className="dark-theme"
        >
          <div
            style={{
              padding: '20px 24px',
              background: 'rgba(248, 248, 248, 0.95)',
              backdropFilter: 'blur(40px)',
              borderBottom: '0.5px solid rgba(0, 0, 0, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              flexShrink: '0',
            }}
            className="chatbotHeader"
          >
            <button
              onClick={() => setIsWidgetOpen(false)}
              style={{
                position: 'absolute',
                left: '16px',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, rgba(255,59,48,0.12) 0%, rgba(255,45,33,0.08) 100%)',
                border: 'none',
                color: '#FF3B30',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              className="chatbotCloseButton"
              aria-label="Close chatbot"
            >
              ✕
            </button>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              className="headerLeft"
            >
              <h4
                style={{
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  fontSize: '17px',
                  fontWeight: '600',
                  color: '#000000',
                  margin: '0',
                  letterSpacing: '-0.4px',
                  textAlign: 'center',
                }}
              >
                Vidya's AI Assistant
              </h4>
              <p
                style={{
                  fontSize: '13px',
                  color: '#86868b',
                  margin: '2px 0 0 0',
                  textAlign: 'center',
                }}
              >
                Ask me about Vidya's expertise or any topic
              </p>
            </div>
          </div>

          <div
            id="chatbot-messages"
            style={{
              flex: '1',
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '20px 16px',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
            className="chatbotMessages"
          >
            {messages.map(message => (
              <div key={message.id} className="messageContainer">
                <div
                  className={`message ${message.role === 'user' ? 'user' : 'bot'}`}
                  style={{
                    maxWidth: '70%',
                    padding: '12px 16px',
                    borderRadius: '22px',
                    marginBottom: '12px',
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    fontSize: '16px',
                    lineHeight: '1.47',
                    fontWeight: '400',
                    wordBreak: 'normal',
                    whiteSpace: 'normal',
                    overflowWrap: 'break-word',
                    direction: 'ltr',
                    writingMode: 'horizontal-tb',
                    display: 'inline-block',
                    animation: 'slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    background:
                      message.role === 'user'
                        ? 'linear-gradient(135deg, #0A84FF 0%, #64D2FF 100%)'
                        : '#F2F2F7',
                    color: message.role === 'user' ? '#ffffff' : '#000000',
                    border: message.role === 'user' ? 'none' : 'none',
                    boxShadow:
                      message.role === 'user'
                        ? '0 2px 12px rgba(10, 132, 255, 0.35)'
                        : '0 2px 12px rgba(0, 122, 255, 0.08)',
                    float: message.role === 'user' ? 'right' : 'left',
                    clear: 'both',
                    borderBottomRightRadius:
                      message.role === 'user' ? '6px' : '22px',
                    borderBottomLeftRadius:
                      message.role === 'bot' ? '6px' : '22px',
                    marginLeft: message.role === 'user' ? 'auto' : '0',
                    marginRight: message.role === 'bot' ? 'auto' : '0',
                    position: 'relative',
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: message.content }} />
                  <button
                    className="copyButton"
                    onClick={() => copyToClipboard(message.content)}
                    aria-label="Copy message"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#86868b',
                      fontSize: '12px',
                      cursor: 'pointer',
                      padding: '4px 6px',
                      borderRadius: '20px',
                      transition: 'all 0.2s ease',
                      position: 'absolute',
                      right: '4px',
                      top: '4px',
                      opacity: 0,
                      zIndex: 1,
                    }}
                  >
                    📋
                  </button>
                </div>

                {message.role === 'assistant' && message.metadata && (
                  <div
                    style={{
                      fontSize: '11px',
                      marginTop: '8px',
                      lineHeight: '1.5',
                      fontWeight: '400',
                      color: '#000000',
                      opacity: '0.8',
                    }}
                    className="messageMetadata"
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: 'var(--space-md)',
                        justifyContent: 'space-between',
                      }}
                      className="metadataRow"
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          minWidth: '0',
                          flex: '1',
                        }}
                        className="metadataItem"
                      >
                        <span
                          style={{
                            fontWeight: '500',
                            opacity: '0.8',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                          className="metadataLabel"
                        >
                          🌐 Source:
                        </span>
                        <span
                          style={{
                            fontWeight: '600',
                            color: '#000000',
                            fontSize: '10px',
                            wordBreak: 'break-word',
                          }}
                          className="metadataValue"
                        >
                          {message.metadata.source}
                        </span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          minWidth: '0',
                          flex: '1',
                        }}
                        className="metadataItem"
                      >
                        <span
                          style={{
                            fontWeight: '500',
                            opacity: '0.8',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                          className="metadataLabel"
                        >
                          🏷️ Model:
                        </span>
                        <span
                          style={{
                            fontWeight: '600',
                            color: '#000000',
                            fontSize: '10px',
                            wordBreak: 'break-word',
                          }}
                          className="metadataValue"
                        >
                          {message.metadata.model}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: 'var(--space-md)',
                        justifyContent: 'space-between',
                      }}
                      className="metadataRow"
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          minWidth: '0',
                          flex: '1',
                        }}
                        className="metadataItem"
                      >
                        <span
                          style={{
                            fontWeight: '500',
                            opacity: '0.8',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                          className="metadataLabel"
                        >
                          📊 Category:
                        </span>
                        <span
                          style={{
                            fontWeight: '600',
                            color: '#000000',
                            fontSize: '10px',
                            wordBreak: 'break-word',
                          }}
                          className="metadataValue"
                        >
                          {message.metadata.category}
                        </span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          minWidth: '0',
                          flex: '1',
                        }}
                        className="metadataItem"
                      >
                        <span
                          style={{
                            fontWeight: '500',
                            opacity: '0.8',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                          className="metadataLabel"
                        >
                          ⚡ Runtime:
                        </span>
                        <span
                          style={{
                            fontWeight: '600',
                            color: '#000000',
                            fontSize: '10px',
                            wordBreak: 'break-word',
                          }}
                          className="metadataValue"
                        >
                          {message.metadata.runtime}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {message.role === 'assistant' &&
                  message.error &&
                  !message.retrying && (
                    <div
                      className="retryContainer"
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginTop: 'var(--space-xs)',
                      }}
                    >
                      <button
                        style={{
                          background: '#ff9800',
                          color: 'var(--color-white)',
                          border: 'none',
                          borderRadius: '50px',
                          padding: '6px 12px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'background var(--transition-base)',
                        }}
                        onClick={() => retryMessage(message.id)}
                        disabled={retryMessageId === message.id}
                      >
                        {retryMessageId === message.id
                          ? 'Retrying...'
                          : 'Retry Message'}
                      </button>
                    </div>
                  )}
              </div>
            ))}

            {isTyping && (
              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                  padding: '12px 16px',
                  background: '#F2F2F7',
                  borderRadius: '22px',
                  borderBottomLeftRadius: '6px',
                  maxWidth: 'fit-content',
                  float: 'left',
                  clear: 'both',
                  marginBottom: '12px',
                }}
                className="typingIndicator"
              >
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#8E8E93',
                    animation: 'typingDot 1.4s ease-in-out infinite',
                  }}
                ></span>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#8E8E93',
                    animation: 'typingDot 1.4s ease-in-out infinite',
                    animationDelay: '0.2s',
                  }}
                ></span>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#8E8E93',
                    animation: 'typingDot 1.4s ease-in-out infinite',
                    animationDelay: '0.4s',
                  }}
                ></span>
              </div>
            )}

            {/* Message suggestions for 2025 features */}
            {messages.length <= 1 && !isTyping && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginTop: '10px',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    color: '#86868b',
                    marginBottom: '6px',
                    fontWeight: '500',
                  }}
                >
                  Try asking:
                </span>
                {[
                  "What's your experience in energy markets?",
                  'Tell me about your projects',
                  'What are your skills?',
                  'How can I contact you?',
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputValue(suggestion);
                      inputRef.current?.focus();
                    }}
                    style={{
                      background: 'rgba(0, 122, 255, 0.08)',
                      border: '1px solid rgba(0, 122, 255, 0.15)',
                      borderRadius: '20px',
                      padding: '8px 12px',
                      fontSize: '13px',
                      color: '#007AFF',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    className="suggestionButton"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div
            style={{
              padding: '16px 20px',
              background: 'rgba(248, 248, 248, 0.95)',
              backdropFilter: 'blur(40px)',
              borderTop: '0.5px solid rgba(0, 0, 0, 0.06)',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              flexShrink: '0',
            }}
            className="chatbotInput"
          >
            <input
              ref={inputRef}
              id="chatbot-input"
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me a question..."
              style={{
                flex: '1',
                padding: '12px 16px',
                borderRadius: '22px',
                border: '1px solid rgba(0, 122, 255, 0.15)',
                background: '#ffffff',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '16px',
                color: '#000000',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              aria-label="Type your message"
            />
            <button
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: '0',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                background: 'linear-gradient(135deg, #007AFF 0%, #0051D5 100%)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
              }}
              className="chatbotSendButton"
              onClick={handleSend}
              aria-label="Send message"
              disabled={inputValue.trim() === ''}
            >
              ➤
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
