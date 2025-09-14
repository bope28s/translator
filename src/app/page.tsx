'use client';

import { useState } from 'react';
import { Languages, MessageCircle, ArrowLeft } from 'lucide-react';
import TranslationPage from '@/components/TranslationPage';
import ChatPage from '@/components/ChatPage';

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<'select' | 'translation' | 'chat'>('select');

  const handleModeSelect = (mode: 'translation' | 'chat') => {
    setSelectedMode(mode);
  };

  const handleBackToSelect = () => {
    setSelectedMode('select');
  };

  if (selectedMode === 'translation') {
    return <TranslationPage onBack={handleBackToSelect} />;
  }

  if (selectedMode === 'chat') {
    return <ChatPage onBack={handleBackToSelect} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
              AI Assistant
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              번역과 대화를 모두 지원하는 AI 어시스턴트
            </p>
          </div>

          {/* Mode Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Translation Card */}
            <div 
              onClick={() => handleModeSelect('translation')}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200 dark:border-gray-700"
            >
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Languages className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  번역
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  자동 언어 감지로 원하는 언어로 번역해드립니다
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    🌍 100+ 언어 지원<br/>
                    🔍 자동 언어 감지<br/>
                    ⚡ 실시간 번역
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Card */}
            <div 
              onClick={() => handleModeSelect('chat')}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200 dark:border-gray-700"
            >
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  대화
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  AI와 자유롭게 대화하고 질문에 답변받으세요
                </p>
                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    💬 자연스러운 대화<br/>
                    🧠 지능적인 추론<br/>
                    📚 다양한 주제 지원
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              OpenAI GPT를 활용한 AI 서비스
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
