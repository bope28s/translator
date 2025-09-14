import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { message, messages } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: '메시지가 필요합니다.' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 대화 기록을 OpenAI 형식으로 변환
    const conversationHistory = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    }));

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `당신은 친근하고 도움이 되는 AI 어시스턴트입니다. 
          - 한국어로 대화해주세요.
          - 정확하고 유용한 정보를 제공해주세요.
          - 복잡한 주제도 이해하기 쉽게 설명해주세요.
          - 창의적이고 실용적인 조언을 해주세요.
          - 사용자의 질문에 대해 상세하고 도움이 되는 답변을 제공해주세요.`,
        },
        ...conversationHistory,
        {
          role: 'user',
          content: message,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content?.trim();

    if (!response) {
      throw new Error('응답을 받을 수 없습니다.');
    }

    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: '대화 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
