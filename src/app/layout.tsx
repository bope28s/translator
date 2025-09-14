import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Translator & Chat - 번역기능과 추론기능이 있는 대화형 AI 앱",
  description: "OpenAI GPT를 활용한 AI 번역기 및 대화형 어시스턴트. 자동 언어 감지로 100+ 언어 지원, 자연스러운 AI 대화 기능 제공.",
  keywords: "AI, 번역, 대화, OpenAI, GPT, 번역기, AI 어시스턴트",
  authors: [{ name: "AI Translator & Chat" }],
  openGraph: {
    title: "AI Translator & Chat",
    description: "번역기능과 추론기능이 있는 대화형 AI 앱",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Translator & Chat",
    description: "번역기능과 추론기능이 있는 대화형 AI 앱",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
