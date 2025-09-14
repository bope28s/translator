# AI Translator & Chat

번역기능과 추론기능이 있는 대화형 AI 앱입니다. OpenAI GPT를 활용하여 실시간 번역과 자연스러운 대화를 제공합니다.

## 🚀 주요 기능

- **번역 기능**: 자동 언어 감지로 100+ 언어 지원
- **AI 대화**: 자연스러운 대화형 AI 어시스턴트
- **반응형 디자인**: 데스크톱과 모바일 모두 지원
- **보안**: API 키 보호 및 안전한 환경변수 관리

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-3.5-turbo
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone <your-repository-url>
cd translator
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경변수 설정
`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Next.js Configuration
NEXT_PUBLIC_APP_NAME=AI Translator & Chat
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🔐 보안 설정

### API 키 보안
- API 키는 서버 사이드에서만 사용됩니다
- 클라이언트 사이드에서는 API 키에 접근할 수 없습니다
- 환경변수는 `.env.local` 파일에 저장되며 Git에 커밋되지 않습니다

### Vercel 배포 시 환경변수 설정
1. Vercel 대시보드에서 프로젝트 선택
2. Settings > Environment Variables로 이동
3. 다음 환경변수 추가:
   - `OPENAI_API_KEY`: OpenAI API 키
   - `NEXT_PUBLIC_APP_NAME`: 앱 이름 (선택사항)

## 🚀 배포

### Vercel 배포
1. GitHub에 코드 푸시
2. Vercel에서 GitHub 저장소 연결
3. 환경변수 설정
4. 자동 배포 완료

### 수동 배포
```bash
npm run build
npm start
```

## 📱 사용법

### 번역 기능
1. 메인 화면에서 "번역" 카드 선택
2. 번역할 텍스트 입력
3. 목표 언어 선택
4. "번역하기" 버튼 클릭
5. 결과 복사 가능

### AI 대화
1. 메인 화면에서 "대화" 카드 선택
2. 메시지 입력 후 전송
3. AI와 자연스러운 대화 진행
4. Enter로 전송, Shift+Enter로 줄바꿈

## 🎨 UI/UX 특징

- **그라데이션 배경**: 시각적으로 아름다운 그라데이션
- **다크 모드 지원**: 시스템 설정에 따른 자동 다크 모드
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- **애니메이션**: 부드러운 호버 효과와 전환 애니메이션
- **직관적 인터페이스**: 사용하기 쉬운 카드 기반 네비게이션

## 🔧 개발

### 프로젝트 구조
```
src/
├── app/
│   ├── api/
│   │   ├── translate/route.ts    # 번역 API
│   │   └── chat/route.ts         # 채팅 API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # 메인 페이지
└── components/
    ├── TranslationPage.tsx       # 번역 페이지
    └── ChatPage.tsx              # 채팅 페이지
```

### 주요 컴포넌트
- **Home**: 메인 선택 화면
- **TranslationPage**: 번역 기능 페이지
- **ChatPage**: AI 대화 페이지

## 📄 라이선스

MIT License

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

문제가 발생하거나 질문이 있으시면 GitHub Issues를 통해 문의해주세요.