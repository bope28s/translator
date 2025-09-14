import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json();

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: '텍스트와 목표 언어가 필요합니다.' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    // 번역 프롬프트 생성
    const prompt = `다음 텍스트를 ${targetLanguage}로 번역해주세요. 자연스럽고 정확한 번역을 제공해주세요. 번역 결과만 반환하고 다른 설명은 추가하지 마세요.

텍스트: ${text}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '당신은 전문 번역가입니다. 주어진 텍스트를 정확하고 자연스럽게 번역해주세요.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0.3,
    });

    const translatedText = completion.choices[0]?.message?.content?.trim();

    if (!translatedText) {
      throw new Error('번역 결과를 받을 수 없습니다.');
    }

    return NextResponse.json({
      translatedText,
      originalText: text,
      targetLanguage,
    });
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: '번역 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
