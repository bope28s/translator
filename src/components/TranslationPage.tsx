'use client';

import { useState } from 'react';
import { ArrowLeft, Languages, Copy, Check } from 'lucide-react';

interface TranslationPageProps {
  onBack: () => void;
}

export default function TranslationPage({ onBack }: TranslationPageProps) {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Korean');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages = [
    'Korean', 'English', 'Japanese', 'Chinese', 'Spanish', 'French', 
    'German', 'Italian', 'Portuguese', 'Russian', 'Arabic', 'Hindi'
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          targetLanguage: targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error('번역에 실패했습니다.');
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('번역 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (translatedText) {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
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
              <div className="bg-blue-100 dark:bg-blue-900 w-10 h-10 rounded-full flex items-center justify-center">
                <Languages className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                번역
              </h1>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  번역할 텍스트
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="번역하고 싶은 텍스트를 입력하세요..."
                  className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  목표 언어
                </label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleTranslate}
                disabled={!inputText.trim() || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    번역 중...
                  </>
                ) : (
                  <>
                    <Languages className="w-5 h-5" />
                    번역하기
                  </>
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    번역 결과
                  </label>
                  {translatedText && (
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          복사됨
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          복사
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-y-auto">
                  {translatedText ? (
                    <p className="text-gray-800 dark:text-white whitespace-pre-wrap">
                      {translatedText}
                    </p>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      번역 결과가 여기에 표시됩니다...
                    </p>
                  )}
                </div>
              </div>

              {/* Language Info */}
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  💡 사용 팁
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• 입력한 텍스트의 언어를 자동으로 감지합니다</li>
                  <li>• 긴 텍스트도 정확하게 번역해드립니다</li>
                  <li>• 자연스러운 표현으로 번역됩니다</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
