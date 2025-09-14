'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatPageProps {
  onBack: () => void;
}

export default function ChatPage({ onBack }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '안녕하세요! 무엇을 도와드릴까요?',
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          messages: messages,
        }),
      });

      if (!response.ok) {
        throw new Error('응답을 받는데 실패했습니다.');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              뒤로가기
            </button>
            <div className="flex items-center gap-3 ml-4">
              <div className="bg-green-100 dark:bg-green-900 w-10 h-10 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                AI 대화
              </h1>
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start gap-3 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.role === 'user'
                            ? 'text-blue-100'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex gap-3">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="메시지를 입력하세요... (Enter로 전송, Shift+Enter로 줄바꿈)"
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                  rows={2}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white p-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
            <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">
              💡 대화 팁
            </h3>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• 다양한 주제에 대해 자유롭게 질문하세요</li>
              <li>• 복잡한 문제도 단계별로 설명해드립니다</li>
              <li>• 창의적인 아이디어나 글쓰기도 도와드립니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
